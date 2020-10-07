import React, { useContext } from "react";
import styled from "styled-components";
import Channel from "./Channel";
import { MyAudioContext } from "../contexts/MyAudioContext";
import useSetupAudio from "../hooks/useSetupAudio";

const Wrapper = styled.div`
  margin: 5% calc((100% - 300px) / 2) 5% calc((100% - 300px) / 2);
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  background: rgb(5, 5, 5);
  background: linear-gradient(
    0deg,
    rgba(5, 5, 5, 1) -17%,
    rgba(22, 6, 48, 1) 100%
  );
  border-radius: 30px;
  box-shadow: 5px 10px 50px 5px rgba(50, 50, 50, 1);
  z-index: 10;
`;

const InnerPanel = styled.div`
  height: 80%;
  margin: 2rem 3rem 0 3rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ControlPanel = styled.div`
  margin: 0 3rem 1rem 3rem;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  & i {
    cursor: pointer;
  }
`;

const Panel = () => {
  const [state, dispatch] = useContext(MyAudioContext);
  const { channelBuffers, audioContext } = useSetupAudio();

  // mount web auido api
  if (
    !state.isSetup &&
    channelBuffers[0] &&
    channelBuffers[0].buffers.length == 5 &&
    audioContext !== null
  ) {
    dispatch({
      type: "MOUNT_AC",
      payload: audioContext,
    });
    dispatch({
      type: "MOUNT_BUFFERS",
      payload: channelBuffers,
    });
  }

  const play = () => {
    dispatch({
      type: "PLAY",
    });
  };

  const stop = () => {
    dispatch({
      type: "STOP",
    });
  };

  console.log(state);
  return (
    <Wrapper>
      {!state.isSetup ? (
        <p>Loading...</p>
      ) : (
        <>
          <InnerPanel>
            <Channel index={0} />
            <Channel index={1} />
            <Channel index={2} />
            <Channel index={3} />
          </InnerPanel>
          {!state.isPlaying ? (
            <ControlPanel>
              <i
                className="material-icons md-light md-48"
                onClick={() => play()}>
                play_circle_filled
              </i>
            </ControlPanel>
          ) : (
            <ControlPanel>
              <i
                className="material-icons md-light md-48"
                onClick={() => stop()}>
                pause_circle_filled
              </i>
            </ControlPanel>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Panel;
