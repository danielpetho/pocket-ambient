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
          node.loop = true;
          if (!state.playedOnce) {
            node.volume = 100;
            node.start();
          } else {
            node.volume = 100;
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
          node.loop = false;
          node.volume = 0;
        });
      });
      return {
        ...state,
        isPlaying: false,
      };
    case "SET_VOLUME":
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
