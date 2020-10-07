import React, { useEffect, useState, useContext } from "react";
import useStorage from '../hooks/useStorage';

const ac = new AudioContext();

const useSetupAudio = () => {
  const { bufferArray } = useStorage();
  const [ channelBuffers, setChannelBuffers ] = useState([]);
  const [ audioContext, setAudioContext ] = useState(null);

  let sourceNodes = [];

  useEffect(() => {
    //console.log("using useSetupAudio hook")
    if (bufferArray && bufferArray.length == 5) {   
      bufferArray.forEach((buffer, index) => {
        let sourceNode = ac.createBufferSource();
        sourceNode.buffer = buffer.buffer;
        let gainNode = ac.createGain();
        sourceNode.connect(gainNode); 
        gainNode.connect(ac.destination);
        sourceNode.loop = false;

        let node =  {sourceNode, gainNode}; 
        sourceNodes.push(node);
        
      });   
    }

    let buffers = [
      {
        id: 0,
        buffers: sourceNodes,
        volume: 75,
        activeVar: 1,
        channelName: "BACKGROUND",
      },
      {
        id: 1,
        buffers: [],
        volume: 75,
        activeVar: 0,
        channelName: "PAD"
      },
      {
        id: 2,
        buffers: [],
        volume: 75,
        activeVar: 2,
        channelName: "LEAD",
      },
      {
        id: 3,
        buffers: [],
        volume: 75,
        activeVar: 3,
        channelName: "EFFECTS",
      },
    ]

    setChannelBuffers(buffers);
    setAudioContext(ac);
  }, [bufferArray]);

  return { channelBuffers, audioContext };
};

export default useSetupAudio;
