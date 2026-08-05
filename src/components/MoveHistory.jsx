/**
 * MoveHistory component - Displays a chronological list of moves.
 *
 * @param {Array} history - Array of move objects { player, position, moveNumber }
 */
function MoveHistory({ history }) {
  const getPositionLabel = (index) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    return `R${row}C${col}`;
  };

  return (
    <div className="history">
      <h3 className="history__title">Move History</h3>
      {history.length === 0 ? (
        <p className="history__empty">No moves yet</p>
      ) : (
        <ul className="history__list">
          {history.map((move) => (
            <li key={move.moveNumber} className="history__item">
              <span className={`history__player history__player--${move.player.toLowerCase()}`}>
                {move.player}
              </span>
              <span className="history__move">
                → {getPositionLabel(move.position)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoveHistory;
