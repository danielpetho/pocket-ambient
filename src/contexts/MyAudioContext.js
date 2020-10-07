import React, { createContext, useReducer } from "react";

export const MyAudioContext = createContext();

const initialState = {
  audioContext: "",
  channels: [],
  isSetup: false,
  playedOnce: false,
  isPlaying: false,
};

const reducer = (state, action) => {
  //console.log(state, action);
  switch (action.type) {
    case "MOUNT_AC":
      return {
        ...state,
        audioContext: action.payload,
      };
    case "MOUNT_BUFFERS":
      return {
        ...state,
        channels: action.payload,
        isSetup: true,
      };
    case "PLAY":
      state.channels.forEach((channel) => {
        channel.buffers.forEach((node, index) => {
          console.log("starting " + index);
          console.log(node);
          node.sourceNode.loop = true;
          if (!state.playedOnce) {
            node.gainNode.gain.setValueAtTime(1, state.audioContext.currentTime);
            node.sourceNode.start(0);
          } else {
            node.gainNode.gain.setValueAtTime(1, state.audioContext.currentTime);
          }
        });
      });
      return {
        ...state,
        playedOnce: true,
        isPlaying: true,
      };
    case "STOP":
      state.channels.forEach((channel) => {
        channel.buffers.forEach((node, index) => {
          console.log("stopping " + index);
          //node.sourceNode.loop = false;
          node.gainNode.gain.setValueAtTime(0, state.audioContext.currentTime);
        });
      });
      return {
        ...state,
        isPlaying: false,
      };
    case "SET_VOLUME":
      state.channels[action.idx].buffers.forEach((node) => {
        node.gainNode.gain.setValueAtTime(action.payload / 100, state.audioContext.currentTime);
      })
      return {
        ...state,
        channels: state.channels.map((channel, i) =>
          i === action.idx ? { ...channel, volume: action.payload } : channel
        ),
      };
    case "SET_VAR":
      return {
        ...state,
        channels: state.channels.map((channel, i) => 
          i === action.channelIdx
            ? { ...channel, activeVar: action.varIdx }
            : channel
        ),
      };
    default:
      console.log(action);
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
