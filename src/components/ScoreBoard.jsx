/**
 * ScoreBoard component - Tracks and displays wins, losses, and draws.
 *
 * @param {object} scores - Object containing { x: number, o: number, draws: number }
 */
function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__item scoreboard__item--x">
        <span className="scoreboard__label">Player X</span>
        <span className="scoreboard__value">{scores.x}</span>
      </div>
      <div className="scoreboard__item scoreboard__item--draw">
        <span className="scoreboard__label">Draws</span>
        <span className="scoreboard__value">{scores.draws}</span>
      </div>
      <div className="scoreboard__item scoreboard__item--o">
        <span className="scoreboard__label">Player O</span>
        <span className="scoreboard__value">{scores.o}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;
