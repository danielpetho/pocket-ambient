import React, { useContext } from "react";
import styled from "styled-components";
import Channel from "./Channel";
import { UiContext } from "../contexts/UiContext";
import useStorage from "../hooks/useStorage";

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
  z-index: 1;
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
  const { bufferArray } = useStorage();
  const { isPlaying, togglePlay } = useContext(UiContext);

  return (
    <Wrapper>
      <InnerPanel>
        <Channel index={1} />
        <Channel index={2} />
        <Channel index={3} />
        <Channel index={4} />
      </InnerPanel>
      {isPlaying ? (
        <ControlPanel>
          <i className="material-icons md-light md-48" onClick={togglePlay}>
            pause_circle_filled
          </i>
        </ControlPanel>
      ) : (
        <ControlPanel>
          <i className="material-icons md-light md-48" onClick={togglePlay}>
            play_circle_filled
          </i>
        </ControlPanel>
      )}
    </Wrapper>
  );
};

export default Panel;
