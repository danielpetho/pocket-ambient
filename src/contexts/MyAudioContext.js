import React, { createContext, useReducer } from "react";
import { getDistanceAndNearestNote } from '../audio/index';

export const MyAudioContext = createContext();

const fade = (state, channel, variation, nextVariation) => {
  const step = 0.01;
  let fOut = setInterval(() => {
    const gain = channel.variation[variation].variationGain.gain.value;
    channel.variation[variation].variationGain.gain.setValueAtTime(
      gain - step,
      state.audioContext.currentTime
    );
    if (channel.variation[variation].variationGain.gain.value < 0.01) {
      clearInterval(fOut);
    }
  }, 30);
  let fIn = setInterval(() => {
    const gain = channel.variation[nextVariation].variationGain.gain.value;
    channel.variation[nextVariation].variationGain.gain.setValueAtTime(
      gain + step,
      state.audioContext.currentTime
    );
    if (channel.variation[nextVariation].variationGain.gain.value > 0.99) {
      clearInterval(fIn);
    }
  }, 30);
};

const modulateLpf = (lpf, freq, rate, offset) => {
  let alpha = offset;
  let sinMod = setInterval(() => {
    lpf.frequency.value = freq + Math.sin(alpha) * 4900;
    alpha += rate;
  }, 100);
};

const playSamples = (rules, variation, ac) => {
  for (let i = 0; i < 7; i++) {
    setInterval(() => {
      let sourceNode = ac.createBufferSource();

      // pick a random note and octave from the samples.
      const note = rules.notes[Math.floor(Math.random() * rules.notes.length)]
      const octave = rules.octaves[Math.floor(Math.random() * rules.octaves.length)]
      const noteAndOctave = note + octave;
      // get the distance of the requested note and their nearest note, and get the nearest note
      const [distance, nearestNote] = getDistanceAndNearestNote(variation.nodes, noteAndOctave)
      let playbackRate = Math.pow(2, distance / 12);
      const nearestSample = nearestNote.note + nearestNote.octave
      // get the nearest note's node - later to connect the source to their respective gain node
      variation.nodes.forEach((node) => {
        console.log(node.sampleName, nearestSample);
        if (node.sampleName === nearestSample) {
          sourceNode.buffer = node.sampleBuffer;
          sourceNode.playedbackRate.value = playbackRate;
          //sourceNode.buffer = node.sampleBuffer;
          sourceNode.connect(node.gainNode);
          sourceNode.start(ac.currentTime + Math.random((i * 10)));
        }; 
      });

     
     
    }, (i + 2)* 1000);
  }

};

const modulateGain = (variant) => {};

const initialState = {
  audioContext: "",
  channels: [],
  isSetup: false,
  playedOnce: false,
  isPlaying: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MOUNT_AC":
      return {
        ...state,
        audioContext: action.ac,
        channels: action.buffers,
        isSetup: true,
      };
    case "PLAY":
      state.channels.forEach((channel, index) => {
        channel.channelGain.gain.setValueAtTime(
          channel.volume / 100,
          state.audioContext.currentTime
        );
        if (channel.globalRules.modulateLpf) {
          let freq = channel.lpf.frequency.value;
          modulateLpf(channel.lpf, freq, 0.006, -index);
        }
        if (channel.globalRules.multiSample && !state.playedOnce) {
            playSamples(channel.variation[channel.activeVar].rules, channel.variation[channel.activeVar], state.audioContext);
        }
      });
      return {
        ...state,
        playedOnce: true,
        isPlaying: true,
      };
    case "STOP":
      state.channels.forEach((channel) => {
        channel.channelGain.gain.setValueAtTime(
          0,
          state.audioContext.currentTime
        );
      });
      return {
        ...state,
        isPlaying: false,
      };
    case "SET_VOLUME":
      if (state.isPlaying) {
        state.channels[action.idx].channelGain.gain.setValueAtTime(
          action.payload / 100,
          state.audioContext.currentTime
        );
      }

      return {
        ...state,
        channels: state.channels.map((channel, i) =>
          i === action.idx ? { ...channel, volume: action.payload } : channel
        ),
      };
    case "SET_VAR":

      const channel = state.channels[action.channelIdx];
      const activeVar = channel.activeVar;

      fade(state, channel, activeVar, action.varIdx);
      if (channel.globalRules.multiSample) {
        playSamples(channel.variation[activeVar].rules, channel.variation[activeVar], state.audioContext);
      }
      return {
        ...state,
        channels: state.channels.map((channel, i) =>
          i === action.channelIdx
            ? { ...channel, activeVar: action.varIdx }
            : channel
        ),
      };
    default:
      return;
  }
};

export const MyAudioContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyAudioContext.Provider value={[state, dispatch]}>
      {props.children}
    </MyAudioContext.Provider>
  );
};
