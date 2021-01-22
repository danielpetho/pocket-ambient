import React, { createContext, useReducer } from "react";
import { getDistanceAndNearestNote } from "../audio/index";

export const MyAudioContext = createContext();

const fade = (state, channel, currentVariation, nextVariation) => {
  const step = 0.01;
  let fOut = setInterval(() => {
    const gain = channel.variation[currentVariation].variationGain.gain.value;
    channel.variation[currentVariation].variationGain.gain.setValueAtTime(
      gain - step,
      state.audioContext.currentTime
    );

    //console.log(channel.variation[currentVariation].name + " : " + gain)
    if (channel.variation[currentVariation].variationGain.gain.value < 0.01) {
      if (channel.globalRules.multiSample) {
        //channel.currentIntervalIds.forEach((id) => clearInterval(id));
        //channel.currentIntervalIds = channel.nextIntervalIds;
      }

      clearInterval(fOut);
    }
  }, 50);
  let fIn = setInterval(() => {
    const gain = channel.variation[nextVariation].variationGain.gain.value;
    channel.variation[nextVariation].variationGain.gain.setValueAtTime(
      gain + step,
      state.audioContext.currentTime
    );
    //console.log(channel.variation[nextVariation].name + " : " + gain)
    if (channel.variation[nextVariation].variationGain.gain.value > 0.99) {
      clearInterval(fIn);
    }
  }, 50);
};

const modulateLpf = (lpf, freq, rate, offset) => {
  let alpha = offset;
  let sinMod = setInterval(() => {
    lpf.frequency.value = freq + Math.sin(alpha) * 4900;
    alpha += rate;
  }, 100);
};

const playSamples = (rules, variation, ac) => {
  const iIds = [];
  const sourceNodes = [];
  console.log("rules: + " + rules + "variation: " + variation);

  for (let i = 0; i < 7; i++) {
    
    const iId = setInterval(() => {
      let sourceNode = ac.createBufferSource();
      // pick a random note and octave from the samples.
      const note = rules.notes[Math.floor(Math.random() * rules.notes.length)];
      const octave =
        rules.octaves[Math.floor(Math.random() * rules.octaves.length)];
      const noteAndOctave = note + octave;
      // get the distance of the requested note and their nearest note, and get the nearest note
      const [distance, nearestNote] = getDistanceAndNearestNote(
        variation.nodes,
        noteAndOctave
      );
      let playbackRate = Math.pow(2, distance / 12);
      const nearestSample = nearestNote.note + nearestNote.octave;
      // get the nearest note's node - later to connect the source to their respective gain node
      variation.nodes.find((node) => {
        if (node.sampleName === nearestSample) {
          
          sourceNode.buffer = node.sampleBuffer;
          sourceNode.playbackRate.value = playbackRate;
          //sourceNode.buffer = node.sampleBuffer;
          sourceNode.connect(node.gainNode);
          sourceNode.start(ac.currentTime + Math.random(i * 100));
          //sourceNodes.push({instrument: variation.name, name: noteAndOctave, source: sourceNode });
          return true;
        } return false;
      });
    }, (i + 10) * 1000);

    iIds.push(iId);
  }

  return iIds;
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
          const [intervalIds, currentPlayedSamples] = playSamples(
            channel.variation[channel.activeVar].rules,
            channel.variation[channel.activeVar],
            state.audioContext
          );

          channel.currentIntervalIds = intervalIds;
          //channel.currentPlayedSamples = currentPlayedSamples;
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
        const [intervalIds, currentPlayedSamples] = playSamples(
          channel.variation[action.varIdx].rules,
          channel.variation[action.varIdx],
          state.audioContext
        );

        channel.nextIntervalIds = intervalIds;
        //channel.currentPlayedSamples = currentPlayedSamples;
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
