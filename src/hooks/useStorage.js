import { useState, useEffect } from "react";
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
  const [fbErr, setFbErr] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref();
    

    const lib = {reverbBuffer: "", sampleLibrary: []};
    const sampleLib = [];

    storageRef.child("samples/reverb_impulse.wav").getDownloadURL().then((url) => {
      const xhr = new XMLHttpRequest();
      
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url);
      xhr.send();
     

      xhr.onload = async () => {
        let buffer = await decodeAudio(xhr.response);
        lib.reverbBuffer = buffer;
      }
    }).catch((err) => {
      console.error(err.err)
      setFbErr(true)
    });


    //collect the decoded samples into an array
    SAMPLE_LIBRARY.forEach((ch, i) => {
      const channel = {variations: [], channelName: ch.channelName, globalRules: ch.globalRules};
      ch.variations.forEach(variation => {
        
        const vari = {variation: variation.variation, rules: variation.rules, samples: [], name: variation.name};
        const sampleArray = [];

        variation.samples.forEach(sample => {
          let sampleName = sample + ".mp3";
          
          storageRef
            .child("samples/channel" + (i + 1) + "/" + variation.variation + "/" + sampleName)
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
                    sampleLib.push(channel); 

                    if (sampleLib.length === 4) {
                      lib.sampleLibrary = sampleLib;
                      setSampleLibrary(lib);
                      setFbErr(false);
                    }
                  }
                }
              };
            }).catch((err) => {
              console.error(err.err)
              setFbErr(true)
            });
        })
      })
    });
  }, []);
  return { sampleLibrary, fbErr };
};

export default useStorage;
