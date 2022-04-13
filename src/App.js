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
  const [firstClickedRow, setFirstClickedRow] = useState(null);
  const [firstClickedCol, setFirstClickedCol] = useState(null);
  const [secondClickedRow, setSecondClickedRow] = useState(null);
  const [secondClickedCol, setSecondClickedCol] = useState(null);
  const [runChange, setRunChange] = useState(false);
  const [toggleClick, setToggleClick] = useState(true);
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

  const processMove = () => {
    if (firstClickedRow == null || secondClickedRow == null) {
      return;
    }

    const boxFirstColor = currentColorArrangement[firstClickedRow][firstClickedCol];
    const boxSecondColor = currentColorArrangement[secondClickedRow][secondClickedCol];

    currentColorArrangement[firstClickedRow][firstClickedCol] = boxSecondColor;
    currentColorArrangement[secondClickedRow][secondClickedCol] = boxFirstColor;

    //Valid adjacent locations for second clicked box
    const validLocations = [
      [firstClickedRow + 1, firstClickedCol], //Top
      [firstClickedRow - 1, firstClickedCol], //Bottom
      [firstClickedRow, firstClickedCol + 1], //Right
      [firstClickedRow, firstClickedCol - 1], //Left
    ];

    let validMove = false;
    let moveCreatesHits = false;

    //Determine if second clicked box is adjacent to the first box
    validLocations.forEach((loc) => {
      if (secondClickedRow === loc[0] && secondClickedCol === loc[1]) {
        validMove = true;
      }
    });
    //If move is valid, check if any hits can be created
    //TODO Optimize checkBoard to only check at local where move being made instead of looping through full board
    if (validMove) {
      moveCreatesHits = checkBoard();
    }

    if (!moveCreatesHits) {
      console.log("No hits");
      //Reset moved elements
      currentColorArrangement[firstClickedRow][firstClickedCol] = boxFirstColor;
      currentColorArrangement[secondClickedRow][secondClickedCol] = boxSecondColor;
    }

    //Reset Selection
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
    setRunChange(false);
  };

  const createRandomBoard = () => {
    //Reset selections
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
    setRunChange(false);

    const board = buildRandomBoard(colors, width);
    setCurrentColorArrangement(board);
  };

  const handleBoxClick = (row, column) => {
    //Toggle to differentiate between first and second click
    if (toggleClick) {
      setFirstClickedRow(row);
      setFirstClickedCol(column);
    } else {
      setSecondClickedRow(row);
      setSecondClickedCol(column);
    }

    setToggleClick(!toggleClick);

    if (firstClickedRow && secondClickedRow) {
      setRunChange(true);
    }
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

  useEffect(() => {
    processMove();
  }, [runChange, firstClickedRow, secondClickedRow]);

  return (
    <div className="App">
      <h1>Bejeweled</h1>
      <InstructionCard />
      <Board
        board={currentColorArrangement}
        onClick={handleBoxClick}
        firstClickedRow={firstClickedRow}
        firstClickedCol={firstClickedCol}
        secondClickedRow={secondClickedRow}
        secondClickedCol={secondClickedCol}
      />
      <Slider sliderRange={sliderRange} setRange={handleSpeedRange} />
      <ResetButton resetBoard={createRandomBoard} />
    </div>
  );
};

export default App;
