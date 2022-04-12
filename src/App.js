import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  //Default Color Selection
  const colors = ["DarkViolet", "orange", "DarkCyan", "red", "yellow", "navy"];

  //Assign square dimensions
  const width = 10;

  const [currentColorArrangement, setCurrentColorArrangement] = useState([
    ["DarkViolet", "navy", "red", "yellow", "DarkViolet", "red", "DarkViolet", "orange"],
    ["DarkCyan", "DarkCyan", "yellow", "navy", "orange", "DarkCyan", "red", "DarkCyan"],
    ["DarkCyan", "orange", "DarkCyan", "DarkCyan", "DarkCyan", "red", "red", "DarkCyan"],
    ["navy", "orange", "yellow", "red", "DarkViolet", "red", "red", "red"],
    ["DarkViolet", "DarkCyan", "red", "DarkCyan", "DarkViolet", "DarkViolet", "yellow", "DarkCyan"],
    ["navy", "navy", "navy", "DarkCyan", "navy", "DarkViolet", "red", "navy"],
    ["orange", "red", "navy", "yellow", "yellow", "DarkViolet", "DarkViolet", "DarkViolet"],
    ["DarkViolet", "yellow", "DarkCyan", "navy", "navy", "DarkViolet", "DarkViolet", "orange"],
  ]);

  // const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [firstClickedRow, setFirstClickedRow] = useState(null);
  const [firstClickedCol, setFirstClickedCol] = useState(null);
  const [secondClickedRow, setSecondClickedRow] = useState(null);
  const [secondClickedCol, setSecondClickedCol] = useState(null);
  const [runChange, setRunChange] = useState(false);
  const [toggleClick, setToggleClick] = useState(true);
  const [boardSolved, setBoardSolved] = useState(false);

  const checkBoard = () => {
    // if (boardSolved) return;

    let allHitsVertical = [];
    let allHitsHorizontal = [];
    let allHits = [];
    let movePossible = false;

    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentColorArrangement[row][col];

        //Check Horizontally
        if (col < width - 2) {
          let currentStreakHoriz = 1;
          let matchesHoriz = [[col, row]];
          for (let i = col + 1; i < width; i++) {
            const nextColor = currentColorArrangement[row][i];
            if (currentColor === nextColor) {
              currentStreakHoriz++;
              matchesHoriz.push(...[[i, row]]);
            } else {
              break;
            }
          }
          if (currentStreakHoriz > 2) {
            // matchesHoriz.forEach((hit) => (currentColorArrangement[hit[1]][hit[0]] = ""));
            allHitsHorizontal.push(...[matchesHoriz]);
            allHits.push(...matchesHoriz);
            movePossible = true;
          }
        }

        //Check Vertically
        if (row < width - 2) {
          let currentStreakVertical = 1;
          let matchesVertical = [[col, row]];
          for (let i = row + 1; i < width; i++) {
            const nextColor = currentColorArrangement[i][col];
            if (currentColor === nextColor && currentColor !== "") {
              currentStreakVertical++;
              matchesVertical.push(...[[col, i]]);
            } else {
              break;
            }
          }
          if (currentStreakVertical > 2) {
            // matchesVertical.forEach((hit) => (currentColorArrangement[hit[1]][hit[0]] = ""));
            allHitsVertical.push(...[matchesVertical]);
            allHits.push(...matchesVertical);
            movePossible = true;
          }
        }
      }
    }

    //Clear cells that meet match criteria
    allHits.forEach((item) => {
      currentColorArrangement[item[1]][item[0]] = "";
    });

    return movePossible;
  };

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
    if (!firstClickedRow || !secondClickedCol) {
      return;
    }

    const boxFirstColor = currentColorArrangement[firstClickedRow][firstClickedCol];
    const boxSecondColor = currentColorArrangement[secondClickedRow][secondClickedCol];

    currentColorArrangement[firstClickedRow][firstClickedCol] = boxSecondColor;
    currentColorArrangement[secondClickedRow][secondClickedCol] = boxFirstColor;

    const movePossible = checkBoard();

    if (!movePossible) {
      console.log("INVALID");
      currentColorArrangement[firstClickedRow][firstClickedCol] = boxFirstColor;
      currentColorArrangement[secondClickedRow][secondClickedCol] = boxSecondColor;
      setCurrentColorArrangement([...currentColorArrangement]);
    }

    //Reset Selection
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
    setRunChange(false);
  };

  const createBoard = () => {
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
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkBoard();
      checkFirstRow();
      moveIntoBoxBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 500);
    return () => clearInterval(timer);
  }, [checkBoard, checkFirstRow, moveIntoBoxBelow, boardSolved, currentColorArrangement]);

  useEffect(() => {
    processMove();
  }, [runChange, firstClickedRow, secondClickedRow]);

  const handleBoxClick = (row, column) => {
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
    </div>
  );
}

export default App;
