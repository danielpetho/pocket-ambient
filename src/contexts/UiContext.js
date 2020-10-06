import React, { createContext, Component } from "react";

export const UiContext = createContext();

class UiContextProvider extends Component {
  state = {
    channels: {
      1: {
        activeBtnIndex: 1,
        channelName: "BACKGROUND",
        volume: 75,
      }, 

      2: {
        activeBtnIndex: 1,
        channelName: "PAD",
        volume: 75,
      },

      3: {
        activeBtnIndex: 2,
        channelName: "PIANO",
        volume: 75,
      },

      4: {
        activeBtnIndex: 4,
        channelName: "HARP",
        volume: 75,
      },
      isPlaying: false,
    }
  };

  togglePlay = () => {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  };

  onSliderChange = (channelId, value) => {
    let channelState = this.state.channels[channelId];
    channelState.volume = value;
    this.setState({ channelState });
  };

  toggleActiveBtn = (channelId, btnId) => {
    let channelState = this.state.channels[channelId];

    channelState.activeBtnIndex = btnId;
    this.setState({ channelState });
  };

  render() {
    return (
      <UiContext.Provider value={{ ...this.state, togglePlay: this.togglePlay, toggleActiveBtn: this.toggleActiveBtn }}>
        {this.props.children}
      </UiContext.Provider>
    );
  }
}

export default UiContextProvider;
