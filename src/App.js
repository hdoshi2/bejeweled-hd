//React
import React, { useEffect, useCallback } from "react";
//css
import "./App.css";
//Components
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { Slider } from "./components/Slider";
import { InstructionCard } from "./components/InstructionCard";
//Hooks/Misc
import useCheckBoard from "./hooks/useCheckBoard";
import { width, colorScheme } from "./data/config";
import { buildRandomBoard } from "./utils";

const App = () => {
  let { setBoard, currentBoard, checkBoard, sliderRange, setSliderRange } = useCheckBoard({
    colors: colorScheme,
    width,
  });

  const createRandomBoard = useCallback(() => {
    //Reset selections
    // setFirstClickedRow(null);
    // setFirstClickedCol(null);
    // setSecondClickedRow(null);
    // setSecondClickedCol(null);
    // setRunChange(false);

    const board = buildRandomBoard(colorScheme, width);
    setBoard(board);
    currentBoard = [...board];
  }, []);

  //Initialize the Board
  useEffect(() => {
    createRandomBoard();
  }, []);

  return (
    <div className="App">
      <h1>Bejeweled</h1>
      <InstructionCard />
      <Board currentBoard={currentBoard} checkBoard={checkBoard} />
      <Slider sliderRange={sliderRange} setRange={setSliderRange} />
      <ResetButton resetBoard={createRandomBoard} />
    </div>
  );
};

export default App;
