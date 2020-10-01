import React, { useContext } from "react";
import styled, { css } from "styled-components";
import MySlider from "./Slider";
import { UiContext } from "../contexts/UiContext";

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
  const {channel_1, channel_2, channel_3, channel_4, toggleActiveBtn, onSliderChange} = useContext(UiContext);
  let channelState;
  switch (props.index) {
    case 1:
      channelState = channel_1;
      break;
    case 2:
      channelState = channel_2;
      break;
    case 3:
      channelState = channel_3;
      break;
    case 4:
      channelState = channel_4;
      break;
    default:
      channelState = channel_1;
      break;
  }

  return (
    <Wrapper>
      <ChannelName>{channelState.channelName}</ChannelName>
      {channelState.activeBtnIndex === 1 ? <Button active/> : <Button onClick={() => toggleActiveBtn(props.index, 1)}/>}
      {channelState.activeBtnIndex === 2 ? <Button active/> : <Button onClick={() => toggleActiveBtn(props.index, 2)}/>}
      {channelState.activeBtnIndex === 3 ? <Button active/> : <Button onClick={() => toggleActiveBtn(props.index, 3)}/>}
      {channelState.activeBtnIndex === 4 ? <Button active/> : <Button onClick={() => toggleActiveBtn(props.index, 4)}/>}
      <MySlider />
    </Wrapper>
  );
};

export default Channel;
