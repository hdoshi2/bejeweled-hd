import { useState } from "react";

const useCheckBoard = ({ width }) => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const checkBoard = () => {
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

  return { currentColorArrangement, setCurrentColorArrangement, checkBoard };
};

export default useCheckBoard;
