//React
import React, { useState, useEffect } from "react";
//css
import "./App.css";
//Components
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { Slider } from "./components/Slider";
//Hooks/misc
import useCheckBoard from "./hooks/useCheckBoard";
import { width, colorScheme } from "./data/config";
import { board_8x8_2 } from "./data/sampleBoards";

const App = () => {
  const [colors, setColorStyle] = useState(colorScheme);
  const [firstClickedRow, setFirstClickedRow] = useState(null);
  const [firstClickedCol, setFirstClickedCol] = useState(null);
  const [secondClickedRow, setSecondClickedRow] = useState(null);
  const [secondClickedCol, setSecondClickedCol] = useState(null);
  const [runChange, setRunChange] = useState(false);
  const [toggleClick, setToggleClick] = useState(true);
  const [boardSolved, setBoardSolved] = useState(false);
  const [processingBoard, setProcessingBoard] = useState(false);
  //Range set to speed assigned as blocks and removed
  const [sliderRange, setSliderRange] = useState(50);

  const { currentColorArrangement, setCurrentColorArrangement, checkBoard } = useCheckBoard({
    width,
  });

  const checkFirstRow = () => {
    // if (boardSolved) return;
    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentColorArrangement[row][col];
        if (row === 0 && currentColor === "") {
          const randomNumber = Math.floor(Math.random() * colors.length);
          currentColorArrangement[row][col] = colors[randomNumber];
        }
      }
    }
  };

  const moveIntoBoxBelow = () => {
    // if (boardSolved) return;

    //Create string for comparison
    const oldArrangement = JSON.stringify(currentColorArrangement);

    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentColorArrangement[row][col];
        if (row !== width - 1 && currentColorArrangement[row + 1][col] === "") {
          currentColorArrangement[row + 1][col] = currentColor;
          currentColorArrangement[row][col] = "";
        }
      }
    }

    //validate if current board is sovled by comparing before/after results
    if (oldArrangement === JSON.stringify(currentColorArrangement)) {
      setBoardSolved(true);
    }
  };

  const processMove = () => {

    if (firstClickedRow == null || secondClickedCol == null) {
      return;
    }

    if (processingBoard) {
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
      // setCurrentColorArrangement([...currentColorArrangement]);
    }

    //Reset Selection
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
    setRunChange(false);
  };

  const createRandomBoard = () => {
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
    setRunChange(false);

    const randomColorArrangement = [];
    for (let i = 0; i < width; i++) {
      const newArray = [];
      for (let j = 0; j < width; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newArray.push(randomColor);
      }
      randomColorArrangement.push(newArray);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    setColorStyle(colorScheme);
    createRandomBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProcessingBoard(true);
      checkBoard();
      checkFirstRow();
      moveIntoBoxBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
      setProcessingBoard(false);
    }, sliderRange * 10);
    return () => clearInterval(timer);
  }, [checkBoard, checkFirstRow, moveIntoBoxBelow, boardSolved, currentColorArrangement]);

  useEffect(() => {
    processMove();
  }, [runChange, firstClickedRow, secondClickedRow]);

  const handleBoxClick = (row, column) => {
    //Toggle to differentiate between first and second click
    if (processingBoard) {
      console.log("processing");
      return;
    }
    console.log("handleBoxClick");
    console.log(row, column);

    if (toggleClick) {
      setFirstClickedRow(row);
      setFirstClickedCol(column);
    } else {
      setSecondClickedRow(row);
      setSecondClickedCol(column);
    }

    setToggleClick(!toggleClick);
    console.log(firstClickedRow);
    console.log(secondClickedRow);

    if (firstClickedRow && secondClickedRow) {
      setRunChange(true);
    }
  };

  const handleSpeedRange = (range) => {
    setSliderRange(range);
  };

  return (
    <div className="App">
      <h1>Bejewled</h1>
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
