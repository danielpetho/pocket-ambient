import React, { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = () => {
  const [error, setError] = useState(null);
  const [arrayBuffer, setArrayBuffer] = useState(null);


  useEffect(() => {
    const storageRef = projectStorage.ref();

    storageRef
      .child("samples/a3.wav")
      .getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        let arrayBuffer;
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();

        xhr.responseType = "ArrayBuffer";
        xhr.open("GET", url);
        xhr.send();
        
        xhr.onload = () => {
          arrayBuffer = xhr.response;
          setArrayBuffer(arrayBuffer);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { arrayBuffer };
};

export default useStorage;
