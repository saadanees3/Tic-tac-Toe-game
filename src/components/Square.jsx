import { memo } from 'react';

/**
 * Square component - Represents a single cell on the board.
 * 
 * @param {string|null} value - The current value ('X', 'O', or null)
 * @param {function} onClick - Handler for cell click events
 * @param {boolean} isWinning - Whether this cell is part of winning combination
 * @param {boolean} isDisabled - Whether clicks should be ignored
 */
function Square({ value, onClick, isWinning = false, isDisabled = false }) {
  const classNames = [
    'square',
    value ? `square--${value.toLowerCase()}` : '',
    isWinning ? 'square--winning' : '',
    !value && !isDisabled ? 'square--hoverable' : '',
    isDisabled ? 'square--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
      disabled={isDisabled}
    >
      {value && <span className="square__value">{value}</span>}
    </button>
  );
}

export default memo(Square);
