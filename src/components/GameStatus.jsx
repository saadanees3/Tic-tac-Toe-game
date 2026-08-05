/**
 * GameStatus component - Displays the current game state to the player.
 *
 * @param {string} status - The current game status message
 * @param {string} currentPlayer - The current player ('X' or 'O')
 * @param {boolean} isGameOver - Whether the game has ended
 */
function GameStatus({ status, currentPlayer, isGameOver }) {
  const getStatusClass = () => {
    if (status.includes('wins')) {
      return status.includes('X') ? 'status--x-wins' : 'status--o-wins';
    }
    if (status.includes('draw')) {
      return 'status--draw';
    }
    return currentPlayer === 'X' ? 'status--x-turn' : 'status--o-turn';
  };

  return (
    <div className={`status ${getStatusClass()}`}>
      <div className="status__player-indicator">
        {!isGameOver && (
          <span className={`status__turn-marker status__turn-marker--${currentPlayer.toLowerCase()}`}>
            {currentPlayer}
          </span>
        )}
      </div>
      <h2 className="status__text">{status}</h2>
    </div>
  );
}

export default GameStatus;
