import Square from './Square';

/**
 * Board component - Renders the 3x3 Tic Tac Toe grid.
 *
 * @param {Array} squares - Array of 9 cell values
 * @param {function} onSquareClick - Handler for square clicks
 * @param {Array|null} winningLine - Array of winning cell indices
 * @param {boolean} isGameOver - Whether the game has ended
 */
function Board({ squares, onSquareClick, winningLine = [], isGameOver = false }) {
  const renderSquare = (index) => {
    const isWinning = winningLine.includes(index);

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onSquareClick(index)}
        isWinning={isWinning}
        isDisabled={isGameOver || squares[index] !== null}
      />
    );
  };

  return (
    <div className="board">
      <div className="board__grid">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
      </div>
    </div>
  );
}

export default Board;
