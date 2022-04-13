import React from "react";
import { Box } from "./Box";
import "./Board.css";
import useProcessMove from "../hooks/useProcessMove";


export const Board = ({ currentColorArrangement, checkBoard }) => {
  const { firstClickedRow, firstClickedCol, secondClickedRow, secondClickedCol, handleBoxClick } =
    useProcessMove({ currentColorArrangement, checkBoard });
  return (
    <div>
      {currentColorArrangement.map((rowArray, row) => (
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
    </div>
  );
};
