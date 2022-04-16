import { useState, useEffect } from "react";

const useCheckBoard = ({ colors, width }) => {
  const [board, setBoard] = useState([]);
  let currentBoard = [...board];
  //Range set to speed assigned as blocks and removed
  const [sliderRange, setSliderRange] = useState(50);

  const checkBoard = () => {
    let allHits = [];
    let movePossible = false;

    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentBoard[row][col];

        //Check Horizontally
        if (col < width - 2) {
          let currentStreakHoriz = 1;
          let matchesHoriz = [[col, row]];
          for (let i = col + 1; i < width; i++) {
            const nextColor = currentBoard[row][i];
            if (currentColor === nextColor) {
              currentStreakHoriz++;
              matchesHoriz.push(...[[i, row]]);
            } else {
              break;
            }
          }
          if (currentStreakHoriz > 2) {
            allHits.push(...matchesHoriz);
            movePossible = true;
          }
        }

        //Check Vertically
        if (row < width - 2) {
          let currentStreakVertical = 1;
          let matchesVertical = [[col, row]];
          for (let i = row + 1; i < width; i++) {
            const nextColor = currentBoard[i][col];
            if (currentColor === nextColor && currentColor !== "") {
              currentStreakVertical++;
              matchesVertical.push(...[[col, i]]);
            } else {
              break;
            }
          }
          if (currentStreakVertical > 2) {
            allHits.push(...matchesVertical);
            movePossible = true;
          }
        }
      }
    }

    //Clear cells that meet match criteria
    allHits.forEach((item) => {
      currentBoard[item[1]][item[0]] = "";
    });

    return movePossible;
  };

  const checkFirstRowAndSpawn = () => {
    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentBoard[row][col];
        if (row === 0 && currentColor === "") {
          const randomNumber = Math.floor(Math.random() * colors.length);
          currentBoard[row][col] = colors[randomNumber];
        }
      }
    }
  };

  const moveIntoBoxBelow = () => {
    for (let row = 0; row < width; row++) {
      for (let col = 0; col < width; col++) {
        const currentColor = currentBoard[row][col];
        if (row !== width - 1 && currentBoard[row + 1][col] === "") {
          currentBoard[row + 1][col] = currentColor;
          currentBoard[row][col] = "";
        }
      }
    }
    setBoard([...currentBoard]);
  };

  const iterateBoard = () => {
    checkBoard();
    checkFirstRowAndSpawn();
    moveIntoBoxBelow();
  };

  //Process board mechanics as changes/moves are made.
  useEffect(() => {
    const timer = setInterval(() => {
      iterateBoard();
    }, sliderRange * 10);
    return () => clearInterval(timer);
  }, [currentBoard, board, iterateBoard, sliderRange]);

  return {
    setBoard,
    currentBoard,
    checkBoard,
    sliderRange,
    setSliderRange,
  };
};

export default useCheckBoard;
