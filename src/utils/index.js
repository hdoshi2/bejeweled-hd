
//Returns a random bejewled board with color assignments
// For example:
// [["DarkViolet", "navy", "red", "yellow", "DarkViolet", "red", "DarkViolet", "orange"],
//  ["DarkCyan", "DarkCyan", "yellow", "navy", "orange", "DarkCyan", "red", "DarkCyan"],...]
export const buildRandomBoard = (colors, width) => {
  const randomColorArrangement = [];
  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < width; j++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newRow.push(randomColor);
    }
    randomColorArrangement.push(newRow);
  }
  return randomColorArrangement;
};
