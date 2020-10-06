import React, { createContext, Component } from "react";

export const MyAudioContext = createContext();
const audioContext = new AudioContext();

class MyAudioContextProvider extends Component {
  state = {
    audioContext: audioContext,
    channelBuffers: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
  };

  mountChannelBuffers = (channelId, buffers) => {
    let state = this.state;

    state.channelBuffers[channelId] = buffers;
    this.setState({
      state,
    });
  };

  play = () => {
    let state = this.state;

    state.channels.forEach((channel) => {
      let bufferArray = channel;
      bufferArray.forEach((node, index) => {
        console.log("starting " + index);
        node.loop = true;
        node.start();
      });
    });
  };

  stop = () => {
    let state = this.state;

    state.channels.forEach((channel) => {
      let bufferArray = channel;
      bufferArray.forEach((node, index) => {
        console.log("stopping " + index);
        node.loop = false;
        node.stop();
      });
    });
  };

  render() {
    return (
      <MyAudioContext.Provider
        value={{
          ...this.state,
          mountChannelBuffers: this.mountChannelBuffers,
          play: this.play,
          stop: this.stop,
        }}>
        {this.props.children}
      </MyAudioContext.Provider>
    );
  }
}

export default MyAudioContextProvider;
