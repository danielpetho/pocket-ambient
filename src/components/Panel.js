import React, { useContext } from "react";
import styled from "styled-components";
import Channel from "./Channel";
import { MyAudioContext } from "../contexts/MyAudioContext";
import { WaveSpinner } from "react-spinners-kit";
import useSetupAudio from "../hooks/useSetupAudio";
import { motion } from "framer-motion";

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

const LoadWrapper = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #efefef;
  font-size: 0.5rem;
  text-transform: uppercase;
`;

const InnerPanel = styled(motion.div)`
  height: 80%;
  margin: 2rem 3rem 0 3rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ControlPanel = styled(motion.div)`
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
  const { channelBuffers, audioContext, fbErrProp } = useSetupAudio();

  // mount web auido api
  if (
    !fbErrProp &&
    !state.isSetup &&
    channelBuffers &&
    channelBuffers.length === 4 &&
    audioContext !== null
  ) {
    dispatch({
      type: "MOUNT_AC",
      ac: audioContext,
      buffers: channelBuffers,
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

  if (!fbErrProp) {
    return (
      <Wrapper>
        {!state.isSetup ? (
          <LoadWrapper>
            <WaveSpinner size={30} color={"#fff"}></WaveSpinner>
            <p>Downloading samples...</p>
          </LoadWrapper>
        ) : (
          <>
            <InnerPanel>
              <Channel index={0} />
              <Channel index={1} />
              <Channel index={2} />
              <Channel index={3} />
            </InnerPanel>
            <ControlPanel
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {!state.isPlaying ? (
                <i
                  className="material-icons md-light md-48"
                  onClick={() => play()}
                >
                  play_circle_filled
                </i>
              ) : (
                <i
                  className="material-icons md-light md-48"
                  onClick={() => stop()}
                >
                  pause_circle_filled
                </i>
              )}
            </ControlPanel>
          </>
        )}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <LoadWrapper style={{margin: "1rem"}}>
          <h4>Look's like the site reached it's data plan limit. 
            Check back tomorrow, or consider to support me on Patreon to keep up with the server costs</h4>
        </LoadWrapper>
      </Wrapper>
    )
  }
};

export default Panel;
