import React, { useContext } from "react";
import styled, { css } from "styled-components";
import MySlider from "./Slider";
import { MyAudioContext } from "../contexts/MyAudioContext"

const Wrapper = styled.div`
  height: 100%;
  margin: 1rem 0.5rem 1rem 0.5rem;
`;

const Button = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #626262;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #828282;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #9611ff;

      &:hover {
        background-color: #9611ff;
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

  let channelState = state.channels[props.index];
  const chooseVariation = (id) =>{
    dispatch({
      type: "SET_VAR",
      channelIdx: props.index,
      varIdx: id
    })
  }
  
  return (
    <Wrapper>
      <ChannelName>{channelState.channelName}</ChannelName>
      {channelState.activeVar === 0 ? <Button active/> : <Button onClick={() => chooseVariation(0)}/>}
      {channelState.activeVar === 1 ? <Button active/> : <Button onClick={() => chooseVariation(1)}/>}
      {channelState.activeVar === 2 ? <Button active/> : <Button onClick={() => chooseVariation(2)}/>}
      {channelState.activeVar === 3 ? <Button active/> : <Button onClick={() => chooseVariation(3)}/>}
      <MySlider index={props.index}/>
    </Wrapper>
  );
};

export default Channel;
