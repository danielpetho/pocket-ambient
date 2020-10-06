import React, { useEffect, useState, useContext } from "react";
import MyAudioContext from '../contexts/MyAudioContext'
import useStorage from '../hooks/useStorage';

const ac = new AudioContext();

const useSetupAudio = () => {
  const { bufferArray } = useStorage();
  const [ channelBuffers, setChannelBuffers ] = useState([]);
  const [ audioContext, setAudioContext ] = useState(null);

  let sourceNodes = [];

  useEffect(() => {
    if (bufferArray) {   
      bufferArray.forEach((buffer, index) => {
        let sourceNode = ac.createBufferSource();
        sourceNode.buffer = buffer.buffer;
        sourceNode.connect(ac.destination);
        sourceNodes.push(sourceNode);
        sourceNode.loop = false;
      });   
    }

    setChannelBuffers(sourceNodes);
    setAudioContext(ac);
  }, [bufferArray]);

  return { channelBuffers, audioContext };
};

export default useSetupAudio;
