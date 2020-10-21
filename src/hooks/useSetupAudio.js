import React, { useEffect, useState, useContext } from "react";
import useStorage from "../hooks/useStorage";

const ac = new AudioContext();

const setupChannel = (channel) => {
  let ch = [];
  //let channelMerger = ac.createChannelMerger();
  channel.variations.forEach((vari, i) => {

    let variation = {i, nodes: [], merger: {}, variationGain: {}};
    let varChannelMerger = ac.createChannelMerger();
    const varGainNode = ac.createGain();
    varGainNode.gain.setValueAtTime(0, ac.currentTime);

    let sourceNodes = [];
    vari.samples.forEach((sample) => {
      let sourceNode = ac.createBufferSource();
      sourceNode.buffer = sample.buffer;

      let gainNode = ac.createGain();
      sourceNode.connect(gainNode);

      gainNode.connect(varChannelMerger);
      sourceNode.loop = true;

      let node = { sourceNode, gainNode };
      node.sourceNode.start(0);
      node.gainNode.gain.setValueAtTime(0.75, ac.currentTime);

      sourceNodes.push(node);
    });

    varChannelMerger.connect(varGainNode);
    variation.variationGain = varGainNode;
    variation.merger = varChannelMerger;
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
        
        const channelMerger = ac.createChannelMerger();
        const channelGain = ac.createGain();
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
        variation.variationGain.connect(channelMerger);
        channelMerger.connect(channelGain);
        channels.push({variation, column, chName, activeVar:  Math.floor((Math.random() * 4) + 1), volume: 75, channelGain: channelGain});
      });
      channels.sort((a, b) => {
        return a.column - b.column;
      })
      setChannelBuffers(channels);
      setAudioContext(ac);
    }
  }, [sampleLibrary]);

  return { channelBuffers, audioContext };
};

export default useSetupAudio;
