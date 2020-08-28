import React from "react";
import styled from "styled-components";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderWrapper = styled.div`
  margin-top: 1rem;
  height: 4rem;
  /*background-color: red;*/
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const MySlider = () => {
  return (
    <SliderWrapper>
        <Slider vertical defaultValue={75} 
            railStyle={{backgroundColor: '#626262'}}
            handleStyle={{borderColor: '#efefef', backgroundColor: '#efefef', width: 8, height: 8, marginLeft: -2.2}}
            trackStyle={{borderColor: '#efefef', backgroundColor: '#efefef'}} />
    </SliderWrapper>
  );
};

export default MySlider;
