import React, { useState, useEffect } from 'react'
import { useStorage } from './useStorage';

const audioContext = new AudioContext();

const useAudioContext = () => {
    const { bufferArray } = useStorage();
    
    const sourceNodes = [];

    if (bufferArray) {
      bufferArray.forEach((buffer, index) => {
        let sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = buffer.buffer;
        sourceNode.connect(audioContext.destination);
        sourceNodes.push(sourceNode);
        sourceNode.loop = false;
        //sourceNode.start(index);
      });
  
      setup = true;
    }
  
    if (setup && isPlaying) {
      sourceNodes.forEach((node, index) => {
        node.loop = true;
        node.start();
      });
    }

}