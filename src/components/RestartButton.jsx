/**
 * RestartButton component - Provides controls to reset the game.
 *
 * @param {function} onRestart - Handler to reset the current game
 * @param {function} onResetScores - Handler to reset all scores
 */
function RestartButton({ onRestart, onResetScores }) {
  return (
    <div className="controls">
      <button className="btn btn--primary" onClick={onRestart}>
        <span className="btn__icon">↺</span>
        New Game
      </button>
      <button className="btn btn--secondary" onClick={onResetScores}>
        <span className="btn__icon">⟲</span>
        Reset Scores
      </button>
    </div>
  );
}

export default RestartButton;
