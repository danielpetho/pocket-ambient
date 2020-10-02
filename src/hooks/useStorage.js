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
  const [bufferArray, setBufferArray] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref();

    //collect the decoded samples into an array
    const bfArr = [];
    SAMPLE_LIBRARY.Harp.forEach((sample) => {
      let sampleName = sample.note + sample.octave + ".wav";
      storageRef
        .child("samples/harp/" + sampleName)
        .getDownloadURL()
        .then((url) => {
          const xhr = new XMLHttpRequest();

          xhr.responseType = "arraybuffer";
          xhr.open("GET", url);
          xhr.send();

          xhr.onload = async () => {
            let buffer = await decodeAudio(xhr.response);
            bfArr.push({ sampleName, buffer });
            if (bfArr.length == 5) setBufferArray(bfArr);
          };
        })
        .catch((err) => {
          console.error(err.err)
        });
    });
  }, []);
  return { bufferArray };
};

export default useStorage;
