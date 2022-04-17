import React, { useCallback, useEffect } from "react";
import { Box } from "./Box";
import "./Board.css";
import useProcessMove from "../hooks/useProcessMove";
import useCheckBoard from "../hooks/useCheckBoard";
import { ResetButton } from "./ResetButton";
//Misc
import { width, colorScheme } from "../data/config";
import { buildRandomBoard } from "../utils";

export const Board = () => {
  let { setBoard, currentBoard, checkBoard } = useCheckBoard({
    colors: colorScheme,
    width,
  });

  const createRandomBoard = useCallback(() => {
    resetSelection();
    const board = buildRandomBoard(colorScheme, width);
    setBoard(board);
    currentBoard = [...board];
  }, []);

  //Initialize the Board
  useEffect(() => {
    createRandomBoard();
  }, []);

  const {
    firstClickedRow,
    firstClickedCol,
    secondClickedRow,
    secondClickedCol,
    handleBoxClick,
    resetSelection,
  } = useProcessMove({ currentBoard, checkBoard });

  return (
    <div>
      {currentBoard.map((rowArray, row) => (
        <div key={row} className="board">
          {rowArray.map((color, col) => {
            const clicked =
              (col === firstClickedCol && row === firstClickedRow) ||
              (col === secondClickedCol && row === secondClickedRow);
            return (
              <Box
                key={`${row}=${col}`}
                value={color}
                onClick={() => handleBoxClick(row, col)}
                selected={clicked}
              />
            );
          })}
        </div>
      ))}
      <ResetButton resetBoard={createRandomBoard} />
    </div>
  );
};
