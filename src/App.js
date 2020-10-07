import React from "react";
import Panel from "./components/Panel";
import { MyAudioContextProvider } from "./contexts/MyAudioContext";
import Particles from "react-tsparticles";
import particle_options from "../src/assets/particle_options";

const App = () => {
  return (
    <div style={{ display: "grid" }}>
        <MyAudioContextProvider>
          <Panel />
          <Particles
            canvasClassName="particle-canvas"
            options={particle_options}
            id="tsparticles"
          />
        </MyAudioContextProvider>
    </div>
  );
};

export default App;
