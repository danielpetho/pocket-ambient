import React from 'react';
import styled from 'styled-components';
import Channel from './Channel'

const Wrapper = styled.div`
    margin: 5% calc((100% - 300px) / 2) 5% calc((100% - 300px) / 2);
    display: flex;
    /*justify-content: center;*/
    flex-direction: column;
    width: 300px;
    height: 500px;
    background: rgb(5,5,5);
    background: linear-gradient(0deg, rgba(5,5,5,1) -17%, rgba(22,6,48,1) 100%);
    border-radius: 30px;
    box-shadow: 5px 10px 50px 5px rgba(50, 50, 50, 1); 
`

const InnerPanel = styled.div`
    height: 80%;
    margin: 2rem 3rem 0 3rem; 
    display: flex;
    justify-content: center;
    flex-direction: row;   
    /*background-color: green;*/
`

const PlayPanel = styled.div`
    margin: 0 3rem 1rem 3rem;   
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    & i {
        cursor: pointer;
    }
    /*background-color: blue;*/
`

const Panel = () => {
    return (
        <Wrapper>
            <InnerPanel>
                <Channel/>
                <Channel/>
                <Channel/>
                <Channel/>                
            </InnerPanel>
            <PlayPanel>
                <i class='material-icons md-light md-48'>play_circle_filled</i>
            </PlayPanel>
        </Wrapper>
    )
};

export default Panel;

