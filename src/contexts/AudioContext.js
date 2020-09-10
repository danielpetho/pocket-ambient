import React, { createContext, Component } from "react";

export const AudioContext = createContext();

class AudioContextProvider extends Component {
  state = {
    channel_1: {
      activeBtnIndex: 1,
      channelName: "BACKGROUND",
      volume: 75,
    },
    channel_2: {
      activeBtnIndex: 1,
      channelName: "PAD",
      volume: 75,
    },
    channel_3: {
      activeBtnIndex: 2,
      channelName: "PIANO",
      volume: 75,
    },
    channel_4: {
      activeBtnIndex: 4,
      channelName: "HARP",
      volume: 75,
    },
    isPlaying: false,
  };

  togglePlay = () => {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  };

  onSliderChange = (channelId, value) => {
    console.log(channelId, value);
    let channelState;
    switch (channelId) {
      case 1:
        channelState = this.state.channel_1;
        break
      case 2:
        channelState = this.state.channel_2;
        break;
      case 3:
        channelState = this.state.channel_3;
        break;
      case 4:
        channelState = this.state.channel_4;
        break;
      default:
        channelState = this.state.channel_1;
        break;
    }

    channelState.volume = value;
    this.setState({ channelState });
  };

  toggleActiveBtn = (channelId, btnId) => {
    console.log(channelId, btnId);
    let channelState;
    switch (channelId) {
      case 1:
        channelState = this.state.channel_1;
        break
      case 2:
        channelState = this.state.channel_2;
        break;
      case 3:
        channelState = this.state.channel_3;
        break;
      case 4:
        channelState = this.state.channel_4;
        break;
      default:
        channelState = this.state.channel_1;
        break;
    }

    channelState.activeBtnIndex = btnId;
    this.setState({ channelState });
  };

  render() {
    return (
      <AudioContext.Provider value={{ ...this.state, togglePlay: this.togglePlay, toggleActiveBtn: this.toggleActiveBtn }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioContextProvider;
