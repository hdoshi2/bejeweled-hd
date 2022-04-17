//React
import React from "react";
//css
import "./App.css";
//Components
import { Board } from "./components/Board";
import { InstructionCard } from "./components/InstructionCard";


const App = () => {
  return (
    <div className="App">
      <h1>Bejeweled</h1>
      <InstructionCard />
      <Board />
    </div>
  );
};

export default App;
