import React, { useEffect, useState, useContext } from "react";
import useStorage from "../hooks/useStorage";
import { playSample } from '../audio/index';

const ac = new AudioContext();

const setupChannel = (channel) => {
  let ch = [];
  channel.variations.forEach((vari, i) => {

    const variation = {i, nodes: [], merger: {}, variationGain: {}, name: vari.name};
    const varChannelMerger = ac.createChannelMerger();
    const varGainNode = ac.createGain();
    varGainNode.gain.setValueAtTime(0, ac.currentTime);

    let sourceNodes = [];
    vari.samples.forEach((sample) => {
      let sampleName = sample.sampleName.substring(0, sample.sampleName.length - 4);
      let sourceNode = ac.createBufferSource();
      sourceNode.buffer = sample.buffer;

      let gainNode = ac.createGain();
      sourceNode.connect(gainNode);

      gainNode.connect(varChannelMerger);
      sourceNode.loop = true;

      let node = { sourceNode, gainNode, sampleName };
      node.sourceNode.start(0);
      node.gainNode.gain.setValueAtTime(1, ac.currentTime);

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

  console.log(sampleLibrary);

  useEffect(() => {
    
    if (sampleLibrary && sampleLibrary.length === 4) {
      let channels = []
      sampleLibrary.forEach((channel) => {
        
        const channelMerger = ac.createChannelMerger();
        const channelGain = ac.createGain();
        channelGain.gain.setValueAtTime(0, ac.currentTime);
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
        variation.forEach(v => {
          v.variationGain.connect(channelMerger);
        })
        const activeVar = Math.floor((Math.random() * 4));
        variation[activeVar].variationGain.gain.setValueAtTime(1, ac.currentTime);
        channelMerger.connect(channelGain);
        channelGain.connect(ac.destination);
        channels.push({variation, column, chName, activeVar: activeVar, volume: 75, channelGain: channelGain});
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
