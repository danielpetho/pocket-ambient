import React, { useContext } from "react";
import styled from "styled-components";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { MyAudioContext } from "../contexts/MyAudioContext"


const SliderWrapper = styled.div`
  margin-top: 1rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const MySlider = (props) => {
  const [ , dispatch ] = useContext(MyAudioContext);
  const { index } = props;

  const onSliderChange = value => {
    dispatch({
      type: "SET_VOLUME",
      idx: index,
      payload: value
    })
  }

  return (
    <SliderWrapper>
        <Slider vertical defaultValue={75} 
            railStyle={{backgroundColor: '#626262'}}
            handleStyle={{borderColor: '#efefef', backgroundColor: '#efefef', width: 8, height: 8, marginLeft: -2.2}}
            trackStyle={{borderColor: '#efefef', backgroundColor: '#efefef'}}
            onChange={onSliderChange} />
    </SliderWrapper>
  );
};

export default MySlider;
