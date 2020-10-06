import React, { createContext, Component } from "react";

export const MyAudioContext = createContext();


class MyAudioContextProvider extends Component {
  state = {
    audioContext: '',
    channelBuffers: {
      1: {
        buffer: []
      },
      2: {
        buffer: []
      },
      3: {
        buffer: []
      },
      4: {
        buffer: []
      },
    },
    isSetup: false,
    playedOnce: false,
  };

  mountChannelBuffers = (channelId, buffers) => {
    let channelBuffers = this.state.channelBuffers;
    
    channelBuffers[channelId].buffer = buffers;

    this.setState({isSetup : true})

    console.log(this.state);
  };

  play = () => {
    let state = this.state;

    if (state.isSetup) {
      state.channelBuffers.forEach((channel) => {
        let bufferArray = channel;
        bufferArray.forEach((node, index) => {
          console.log("starting " + index);
          node.loop = true;
          node.start();
        });
      });

      state.playedOnce = true;
    }
  };

  stop = () => {
    let state = this.state;

    if (state.playedOnce) {
      state.channelBuffers.forEach((channel) => {
        let bufferArray = channel;
        bufferArray.forEach((node, index) => {
          console.log("stopping " + index);
          node.loop = false;
          node.stop();
        });
      });
    }
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
