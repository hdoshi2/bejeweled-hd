import React from "react";
import { Box } from "./Box";
import "./Board.css";

export const Board = ({
  board,
  onClick,
  firstClickedRow,
  firstClickedCol,
  secondClickedRow,
  secondClickedCol,
}) => {
  return (
    <div className="board">
      {board.map((rowArray, row) => (
        <div key={row}>
          {rowArray.map((color, col) => {
            const clicked =
              (col === firstClickedCol && row === firstClickedRow) ||
              (col === secondClickedCol && row === secondClickedRow);
            return (
              <Box
                key={`${row}=${col}`}
                value={color}
                onClick={() => onClick(row, col)}
                selected={clicked}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

//   return (
//     <div className="board">
//       {board.map((color, index) => {
//         const clicked = index === firstClicked || index === secondClicked;
//         return <Box key={index} value={color} onClick={() => onClick(index)} selected={clicked} />;
//       })}
//     </div>
//   );
// };
