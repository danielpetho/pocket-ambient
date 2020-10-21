import React, { useEffect, useState, useContext } from "react";
import useStorage from "../hooks/useStorage";

const ac = new AudioContext();

const setupChannel = (channel) => {
  let ch = [];
  channel.variations.forEach((vari, i) => {

    let variation = {i, nodes: []};
    let sourceNodes = [];
    vari.samples.forEach((sample) => {
      let sourceNode = ac.createBufferSource();
      sourceNode.buffer = sample.buffer;
      let gainNode = ac.createGain();
      sourceNode.connect(gainNode);
      gainNode.connect(ac.destination);
      sourceNode.loop = false;

      let node = { sourceNode, gainNode };
      sourceNodes.push(node);
    });
    variation.nodes = sourceNodes;
    ch.push(variation);
  });
  return ch;
}


const useSetupAudio = () => {
  const { sampleLibrary } = useStorage();
  const [channelBuffers, setChannelBuffers] = useState([]);
  const [audioContext, setAudioContext] = useState(null);

  //console.log(sampleLibrary);
  useEffect(() => {
    console.log("using useSetupAudio hook");
    
    if (sampleLibrary && sampleLibrary.length === 4) {
      let channels = []
      sampleLibrary.forEach((channel) => {

        let column = 0;
        let chName = "";
        switch(channel.channelName) {
          case "BACKGROUND": 
            column = 0;
            chName = channel.channelName;
            break;
          case "PAD": 
            column = 1;
            chName = channel.channelName;
          break;
            case "LEAD": 
            column = 2;
            chName = channel.channelName;
          break;
            case "EFFECTS": 
            column = 3;
            chName = channel.channelName;
            break;
          default:
            console.error("wrong channelName");
            break;
        }

        let variation = setupChannel(channel);
        channels.push({variation, column, chName, activeVar: 0, volume: 75});
      });
      console.log(channels);
      setAudioContext(ac);
    }
  }, [sampleLibrary]);

  return { channelBuffers, audioContext };
};

export default useSetupAudio;
