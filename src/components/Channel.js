import React, { useContext } from "react";
import styled, { css } from "styled-components";
import MySlider from "./Slider";
import { MyAudioContext } from "../contexts/MyAudioContext";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100%;
  margin: 1rem 0.5rem 1rem 0.5rem;
`;

const Button = styled(motion.div)`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #626262;
  font-size: 0.5rem;
  padding: 5px;
  color: #fefefe;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #828282;
    box-shadow: 0px 0px 8px 0px rgb(255, 255, 255);
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #9611ff;

      &:hover {
        background-color: #9611ff;
        box-shadow: none;
      }
    `}
`;

const ChannelName = styled.p`
  color: #efefef;
  font-size: 0.43rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-transform: uppercase;
`;

const Channel = (props) => {
  const [state, dispatch] = useContext(MyAudioContext);

  const delay = props.index / 2;

  let channelState = state.channels[props.index];
  const chooseVariation = (id) => {
    dispatch({
      type: "SET_VAR",
      channelIdx: props.index,
      varIdx: id,
    });
  };

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: delay}}
    >
      <ChannelName>{channelState.chName}</ChannelName>
      {channelState.activeVar === 0 ? (
        <Button active>{channelState.variation[0].name}</Button>
      ) : (
        <Button onClick={() => chooseVariation(0)}>{channelState.variation[0].name}</Button>
      )}
      {channelState.activeVar === 1 ? (
        <Button active >{channelState.variation[1].name}</Button>
      ) : (
        <Button onClick={() => chooseVariation(1)}>{channelState.variation[1].name}</Button>
      )}
      {channelState.activeVar === 2 ? (
        <Button active >{channelState.variation[2].name}</Button>
      ) : (
        <Button onClick={() => chooseVariation(2)} >{channelState.variation[2].name}</Button>
      )}
      {channelState.activeVar === 3 ? (
        <Button active >{channelState.variation[3].name}</Button>
      ) : (
        <Button onClick={() => chooseVariation(3)} >{channelState.variation[3].name}</Button>
      )}
      <MySlider index={props.index} />
    </Wrapper>
  );
};

export default Channel;
