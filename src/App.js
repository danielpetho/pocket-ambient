import React from "react";
import Panel from "./components/Panel";
import UiContextProvider from "./contexts/UiContext";
import Particles from "react-tsparticles";
import particle_options from "../src/assets/particle_options"


const App = () => {
  return (
    <div style={{display: "grid"}}>
      <UiContextProvider>
        <Panel />
        <Particles canvasClassName="particle-canvas" options={particle_options} id="tsparticles" />
      </UiContextProvider>
    </div>
  );
};

export default App;
