import React from "react";
import Panel from "./components/Panel";
import AudioContextProvider from "./contexts/AudioContext";
import Particles from "react-tsparticles";
import particle_options from "../src/assets/particle_options"


const App = () => {
  return (
    <div style={{display: "grid"}}>
      <AudioContextProvider>
        <Panel />
        <Particles canvasClassName="particle-canvas" options={particle_options} id="tsparticles" />
      </AudioContextProvider>
    </div>
  );
};

export default App;
