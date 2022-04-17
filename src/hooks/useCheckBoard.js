import { useState, useEffect, useCallback } from "react";

const useCheckBoard = ({ colors, width }) => {
  const [board, setBoard] = useState([]);
  let currentBoard = [...board];

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
    allHits.forEach((block) => {
      currentBoard[block[1]][block[0]] = "";
    });

    return movePossible;
  };

  const checkFirstRowAndSpawn = () => {
    const firstRowIndex = 0;
    for (let col = 0; col < width; col++) {
      const currentColor = currentBoard[firstRowIndex][col];
      if (currentColor === "") {
        const randomNumber = Math.floor(Math.random() * colors.length);
        currentBoard[firstRowIndex][col] = colors[randomNumber];
      }
    }
  };

  const dropBlocksBelow = () => {
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
    dropBlocksBelow();
  };

  //Process board mechanics as changes/moves are made.
  useEffect(() => {
    const timer = setInterval(() => {
      iterateBoard();
    }, 100);
    return () => clearInterval(timer);
  }, [currentBoard, board, iterateBoard]);

  return {
    setBoard,
    currentBoard,
    checkBoard,
  };
};

export default useCheckBoard;
