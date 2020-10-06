import React from "react";
import Panel from "./components/Panel";
import Audio from "./components/Audio";
import UiContextProvider from "./contexts/UiContext";
import MyAudioContextProvider from "./contexts/MyAudioContext";
import Particles from "react-tsparticles";
import particle_options from "../src/assets/particle_options";

const App = () => {
  return (
    <div style={{ display: "grid" }}>
      <UiContextProvider>
        <MyAudioContextProvider>
          <Panel />
          <Particles
            canvasClassName="particle-canvas"
            options={particle_options}
            id="tsparticles"
          />
        </MyAudioContextProvider>
      </UiContextProvider>
    </div>
  );
};

export default App;
