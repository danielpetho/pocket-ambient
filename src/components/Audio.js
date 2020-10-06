import React, { useContext } from "react";
import { UiContext } from "../contexts/UiContext";
import { MyAudioContext } from "../contexts/MyAudioContext";
import useSetupAudio from "../hooks/useSetupAudio";

const Audio = () => {
  const { isPlaying, togglePlay } = useContext(UiContext);
 

 

  

  return (
  <>

  </>
  );
};

export default Audio;
