//React
import { useState } from "react";

const useProcessMove = ({ currentBoard, checkBoard }) => {
  const [firstClickedRow, setFirstClickedRow] = useState(null);
  const [firstClickedCol, setFirstClickedCol] = useState(null);
  const [secondClickedRow, setSecondClickedRow] = useState(null);
  const [secondClickedCol, setSecondClickedCol] = useState(null);
  const [isFirstBoxClick, setIsFirstBoxClick] = useState(true);

  const processMove = (secondClickedRow, secondClickedCol) => {

    const boxFirstColor = currentBoard[firstClickedRow][firstClickedCol];
    const boxSecondColor = currentBoard[secondClickedRow][secondClickedCol];

    currentBoard[firstClickedRow][firstClickedCol] = boxSecondColor;
    currentBoard[secondClickedRow][secondClickedCol] = boxFirstColor;

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
      currentBoard[firstClickedRow][firstClickedCol] = boxFirstColor;
      currentBoard[secondClickedRow][secondClickedCol] = boxSecondColor;
    }

    //Reset Selection
    setFirstClickedRow(null);
    setFirstClickedCol(null);
    setSecondClickedRow(null);
    setSecondClickedCol(null);
  };

  const handleBoxClick = (row, column) => {
    //Toggle to differentiate between first and second click
    if (isFirstBoxClick) {
      setFirstClickedRow(row);
      setFirstClickedCol(column);
    } else {
      setSecondClickedRow(row);
      setSecondClickedCol(column);
      processMove(row, column);
    }
    setIsFirstBoxClick(!isFirstBoxClick);
  };

  return { firstClickedRow, firstClickedCol, secondClickedRow, secondClickedCol, handleBoxClick };
};

export default useProcessMove;
