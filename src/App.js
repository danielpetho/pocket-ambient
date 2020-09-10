import React from "react";
import Panel from "./components/Panel";
import AudioContextProvider from "./contexts/AudioContext";

function App() {
  return (
    <AudioContextProvider>
      <Panel />
    </AudioContextProvider>
  );
}

export default App;
