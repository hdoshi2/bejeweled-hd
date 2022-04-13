//React
import React, { useState, useEffect } from "react";
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
import { board_8x8_2 } from "./data/sampleBoards";
import { buildRandomBoard } from "./utils";

const App = () => {
  const [colors, setColorStyle] = useState(colorScheme);
  //Range set to speed assigned as blocks and removed
  const [sliderRange, setSliderRange] = useState(50);

  const {
    currentColorArrangement,
    boardSolved,
    setCurrentColorArrangement,
    setBoardSolved,
    checkBoard,
    checkFirstRowAndSpawn,
    moveIntoBoxBelow,
  } = useCheckBoard({
    colors,
    width,
  });

  const createRandomBoard = () => {
    //Reset selections
    // setFirstClickedRow(null);
    // setFirstClickedCol(null);
    // setSecondClickedRow(null);
    // setSecondClickedCol(null);
    // setRunChange(false);

    const board = buildRandomBoard(colors, width);
    setCurrentColorArrangement(board);
  };

  const handleSpeedRange = (range) => {
    setSliderRange(range);
  };

  //Initialize the Board
  useEffect(() => {
    setColorStyle(colorScheme);
    createRandomBoard();
  }, []);

  //Process board mechanics as changes/moves are made.
  useEffect(() => {
    const timer = setInterval(() => {
      checkBoard();
      checkFirstRowAndSpawn();
      moveIntoBoxBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, sliderRange * 10);
    return () => clearInterval(timer);
  }, [checkBoard, checkFirstRowAndSpawn, moveIntoBoxBelow, boardSolved, currentColorArrangement]);

  return (
    <div className="App">
      <h1>Bejeweled</h1>
      <InstructionCard />
      <Board currentColorArrangement={currentColorArrangement} checkBoard={checkBoard} />
      <Slider sliderRange={sliderRange} setRange={handleSpeedRange} />
      <ResetButton resetBoard={createRandomBoard} />
    </div>
  );
};

export default App;
