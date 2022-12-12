
/**
 * Function to calculate the winner
 * @param {Array} squares Squares state array
 * @return {string} return the winner player
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        position: lines[i],
      };
    }
  }
  return null;
}

/**
 * Get and calculate col and row from clicked index
 * @param {*} index clicked index
 * @return {Array} array of colum and row
 */
function calculateColRow(index) {
  let col = 1;
  let row = 1;
  if (index > 5) {
    row = 3;
    col = index - 6 + 1;
  } else if (index > 2) {
    row = 2;
    col = index - 3 + 1;
  } else {
    col = index + 1;
  }

  return [col, row];
}

export {calculateWinner, calculateColRow};
