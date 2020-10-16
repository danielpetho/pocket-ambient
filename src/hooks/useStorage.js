import React, { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { SAMPLE_LIBRARY } from "../assets/samples";

const audioContext = new AudioContext();

const decodeAudio = async (arrayBuffer) => {
  return audioContext
    .decodeAudioData(arrayBuffer)
    .catch((err) => console.log("hey " + err));
};

const useStorage = () => {
  const [sampleLibrary, setSampleLibrary] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref();

    const lib = [];

    //collect the decoded samples into an array
    SAMPLE_LIBRARY.forEach(ch => {
      const channel = {variations: [], channelName: ch.channelName};
      ch.variations.forEach(variation => {
        
        const vari = {variation: variation, rules: {}, samples: []};
        const sampleArray = [];

        variation.samples.forEach(sample => {
          let sampleName = sample.name + ".mp3";
          
          storageRef
            .child("samples/" + ch + "/" + variation.variation + "/" + sampleName)
            .getDownloadURL()
            .then((url) => {
              const xhr = new XMLHttpRequest();

              xhr.responseType = "arraybuffer";
              xhr.open("GET", url);
              xhr.send();

              xhr.onload = async () => {
                let buffer = await decodeAudio(xhr.response);
                sampleArray.push({ sampleName, buffer });
                if (sampleArray.length === variation.samples.length) {
                  vari.samples = sampleArray;
                  channel.variations.push(vari);
                  if (channel.variations.length === 4) {
                    lib.push(channel); 

                    if (lib.length === 4) {
                      setSampleLibrary(lib);
                    }
                  }
                }
              };
            }).catch((err) => {
              console.error(err.err)
            });
        })
      })
    });
  }, []);
  return { sampleLibrary };
};

export default useStorage;
