import React from 'react'
import styled, {css} from 'styled-components';
import MySlider from './Slider'

const Wrapper = styled.div`
    height: 100%;
    margin: 1rem 0.5rem 1rem 0.5rem;
`

const Button = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-color: #626262;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #828282
    }

    ${({ active }) =>
    active &&
    css`
      background-color: #9611FF;

      &:hover {
        background-color: #9611FF;
      }
    `}
`

const ChannelName = styled.p`
    color: #efefef;
    font-size: 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-transform: uppercase;
`

const Channel = () => {
    return (
        <Wrapper>
            <ChannelName>channel</ChannelName>
            <Button active/>
            <Button/>
            <Button/>
            <Button/>
            <MySlider/>
        </Wrapper>
    )
}

export default Channel
