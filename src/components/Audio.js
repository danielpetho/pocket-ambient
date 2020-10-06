import React, { useContext } from "react";
import { UiContext } from "../contexts/UiContext";
import useStorage from "../hooks/useStorage";

const audioContext = new AudioContext();

// necessary bc can't call stop on 
// buffer nodes if it's not started, 
// and i couldn't find any property to check this
let playedOnce = false;;

let sourceNodes = [];

function play() {
    sourceNodes.forEach((node, index) => {
        console.log("starting " + index)
        node.loop = true;
        node.start();
    });
    
    playedOnce = true;
}

function stop() {
        sourceNodes.forEach((node, index) => {
            console.log("stopping " + index);
            node.loop = false;
            node.stop();
        })
}

const Audio = () => {
  const { bufferArray } = useStorage();
  const { isPlaying, togglePlay } = useContext(UiContext);

  
  let isSetup = false;

  if (bufferArray) {
    bufferArray.forEach((buffer, index) => {
      let sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = buffer.buffer;
      sourceNode.connect(audioContext.destination);
      sourceNodes.push(sourceNode);
      sourceNode.loop = false;
    });

    isSetup = true;
  }

  return (
  <>
    {isPlaying && isSetup && !playedOnce ? play() : ''}
    { console.log(sourceNodes) }
    { console.log(playedOnce, isPlaying, isSetup)}
    {!isPlaying && isSetup && playedOnce ? stop() : ''}
  </>
  );
};

export default Audio;
