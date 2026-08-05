import { useState } from 'react';
import './styles/App.css';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(squares) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: combo };
    }
  }
  return null;
}

function XMark({ size }) {
  return (
    <svg viewBox="0 0 100 100" width={size || 44} height={size || 44} className="mark-svg">
      <defs>
        <linearGradient id="x-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#EE5A24" />
        </linearGradient>
        <filter id="x-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#EE5A24" floodOpacity="0.35" />
        </filter>
      </defs>
      <line x1="22" y1="22" x2="78" y2="78" stroke="url(#x-grad)" strokeWidth="12" strokeLinecap="round" filter="url(#x-shadow)" className="line-draw" />
      <line x1="78" y1="22" x2="22" y2="78" stroke="url(#x-grad)" strokeWidth="12" strokeLinecap="round" filter="url(#x-shadow)" className="line-draw" />
    </svg>
  );
}

function OMark({ size }) {
  return (
    <svg viewBox="0 0 100 100" width={size || 44} height={size || 44} className="mark-svg">
      <defs>
        <linearGradient id="o-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#00B894" />
        </linearGradient>
        <filter id="o-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00B894" floodOpacity="0.35" />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="30" fill="none" stroke="url(#o-grad)" strokeWidth="11" strokeLinecap="round" filter="url(#o-shadow)" className="circle-draw" />
    </svg>
  );
}

function GhostX() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" className="mark-svg ghost-mark">
      <line x1="22" y1="22" x2="78" y2="78" stroke="#FF6B6B" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
      <line x1="78" y1="22" x2="22" y2="78" stroke="#FF6B6B" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
    </svg>
  );
}

function GhostO() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" className="mark-svg ghost-mark">
      <circle cx="50" cy="50" r="30" fill="none" stroke="#4ECDC4" strokeWidth="9" strokeLinecap="round" opacity="0.12" />
    </svg>
  );
}

function XMarkMini() {
  return (
    <svg viewBox="0 0 100 100" width="16" height="16">
      <line x1="22" y1="22" x2="78" y2="78" stroke="#FF6B6B" strokeWidth="14" strokeLinecap="round" />
      <line x1="78" y1="22" x2="22" y2="78" stroke="#FF6B6B" strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

function OMarkMini() {
  return (
    <svg viewBox="0 0 100 100" width="16" height="16">
      <circle cx="50" cy="50" r="30" fill="none" stroke="#4ECDC4" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

function TrophySVG({ type }) {
  if (type === 'x') return (
    <svg viewBox="0 0 40 40" width="28" height="28" className="trophy-svg">
      <defs>
        <linearGradient id="trophy-x" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#EE5A24" />
        </linearGradient>
      </defs>
      <path d="M12 6h16v12a8 8 0 01-16 0V6z" fill="url(#trophy-x)" opacity="0.15" />
      <path d="M12 6h16v12a8 8 0 01-16 0V6z" fill="none" stroke="url(#trophy-x)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8H6v4a3 3 0 003 3h1" fill="none" stroke="url(#trophy-x)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 8h4v4a3 3 0 01-3 3h-1" fill="none" stroke="url(#trophy-x)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="url(#trophy-x)" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="url(#trophy-x)" strokeWidth="2" strokeLinecap="round" />
      <text x="20" y="19" textAnchor="middle" fill="#EE5A24" fontSize="9" fontWeight="bold">X</text>
    </svg>
  );
  if (type === 'o') return (
    <svg viewBox="0 0 40 40" width="28" height="28" className="trophy-svg">
      <defs>
        <linearGradient id="trophy-o" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#00B894" />
        </linearGradient>
      </defs>
      <path d="M12 6h16v12a8 8 0 01-16 0V6z" fill="url(#trophy-o)" opacity="0.15" />
      <path d="M12 6h16v12a8 8 0 01-16 0V6z" fill="none" stroke="url(#trophy-o)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8H6v4a3 3 0 003 3h1" fill="none" stroke="url(#trophy-o)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 8h4v4a3 3 0 01-3 3h-1" fill="none" stroke="url(#trophy-o)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="url(#trophy-o)" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="url(#trophy-o)" strokeWidth="2" strokeLinecap="round" />
      <text x="20" y="19" textAnchor="middle" fill="#00B894" fontSize="9" fontWeight="bold">O</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" className="trophy-svg">
      <circle cx="20" cy="17" r="10" fill="none" stroke="#E0A800" strokeWidth="2" />
      <line x1="13" y1="25" x2="27" y2="25" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="27" x2="20" y2="32" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="#E0A800" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 4 10 8 6 12" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function Square({ value, onClick, isWinning, disabled }) {
  let cls = 'square';
  if (value) cls += ' square--' + value.toLowerCase();
  if (isWinning) cls += ' square--winning';
  if (!value && !disabled) cls += ' square--hoverable';

  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      <div className="square__inner">
        {value === 'X' && <XMark />}
        {value === 'O' && <OMark />}
        {!value && !disabled && currentPlayer === 'X' && <GhostX />}
        {!value && !disabled && currentPlayer === 'O' && <GhostO />}
      </div>
    </button>
  );
}

var currentPlayer = 'X';

function App() {
  const [theme, setTheme] = useState(function () {
    var saved = localStorage.getItem('ttt-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
  });
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  function toggleTheme() {
    var next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ttt-theme', next);
  }

  currentPlayer = currentTurn;
  const isGameOver = winner !== null || isDraw;

  let status;
  if (winner) {
    status = 'Player ' + winner + ' wins!';
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = currentTurn + "'s turn";
  }

  function handleSquareClick(index) {
    if (squares[index] !== null || isGameOver) return;

    const newSquares = squares.slice();
    newSquares[index] = currentTurn;
    setSquares(newSquares);

    setMoveHistory(function (prev) {
      return prev.concat([{ player: currentTurn, position: index, moveNumber: prev.length + 1 }]);
    });

    const result = checkWinner(newSquares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(function (prev) {
        const key = result.winner.toLowerCase();
        const obj = Object.assign({}, prev);
        obj[key] = obj[key] + 1;
        return obj;
      });
      return;
    }

    if (newSquares.every(function (s) { return s !== null; })) {
      setIsDraw(true);
      setScores(function (prev) {
        return Object.assign({}, prev, { draws: prev.draws + 1 });
      });
      return;
    }

    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setCurrentTurn('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setMoveHistory([]);
  }

  function handleResetScores() {
    handleRestart();
    setScores({ x: 0, o: 0, draws: 0 });
  }

  function getPositionLabel(index) {
    const labels = ['A1','A2','A3','B1','B2','B3','C1','C2','C3'];
    return labels[index];
  }

  let statusClass = 'status';
  if (winner) {
    statusClass += winner === 'X' ? ' status--x-wins' : ' status--o-wins';
  } else if (isDraw) {
    statusClass += ' status--draw';
  } else {
    statusClass += currentTurn === 'X' ? ' status--x-turn' : ' status--o-turn';
  }

  const totalGames = scores.x + scores.o + scores.draws;

  return (
    <div className="app">
      <header className="app__header">
        <div className="header-row">
          <div className="logo">
            <div className="logo__icon">
              <svg viewBox="0 0 80 80" width="56" height="56">
                <defs>
                  <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6C5CE7" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="76" height="76" rx="20" fill="url(#logo-bg)" />
                <line x1="20" y1="20" x2="36" y2="36" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <line x1="36" y1="20" x2="20" y2="36" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <circle cx="56" cy="28" r="10" fill="none" stroke="white" strokeWidth="4.5" />
                <line x1="22" y1="52" x2="58" y2="52" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="logo__text">
              <h1 className="logo__title">Tic Tac Toe</h1>
              <p className="logo__sub">Challenge a Friend</p>
            </div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title={'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode'}>
            <span className={'theme-toggle__track theme-toggle__track--' + theme}>
              <span className="theme-toggle__icon theme-toggle__icon--sun"><SunIcon /></span>
              <span className="theme-toggle__icon theme-toggle__icon--moon"><MoonIcon /></span>
              <span className="theme-toggle__thumb"></span>
            </span>
          </button>
        </div>
      </header>

      <main className="app__main">
        <div className="game-layout">
          <div className="game-layout__left">
            <div className="scoreboard">
              <div className="scoreboard__item scoreboard__item--x">
                <div className="scoreboard__avatar">
                  <XMark size={28} />
                </div>
                <span className="scoreboard__name">Player X</span>
                <span className="scoreboard__value">{scores.x}</span>
              </div>

              <div className="scoreboard__center">
                <div className="scoreboard__games">
                  <span className="scoreboard__games-label">Games</span>
                  <span className="scoreboard__games-count">{totalGames}</span>
                </div>
                <div className="scoreboard__divider"></div>
                <div className="scoreboard__draws-inline">
                  <span className="scoreboard__draws-label">Draws</span>
                  <span className="scoreboard__draws-count">{scores.draws}</span>
                </div>
              </div>

              <div className="scoreboard__item scoreboard__item--o">
                <div className="scoreboard__avatar">
                  <OMark size={28} />
                </div>
                <span className="scoreboard__name">Player O</span>
                <span className="scoreboard__value">{scores.o}</span>
              </div>
            </div>

            <div className={statusClass}>
              {!isGameOver && (
                <div className="status__turn-badge">
                  <span className={'status__dot status__dot--' + currentTurn.toLowerCase()}></span>
                  <span className="status__turn-label">Current Turn</span>
                </div>
              )}
              {winner && (
                <div className="status__celebration">
                  <span className="status__winner-mark">
                    {winner === 'X' ? <XMark size={32} /> : <OMark size={32} />}
                  </span>
                </div>
              )}
              {isDraw && (
                <div className="status__celebration">
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <text x="16" y="24" textAnchor="middle" fontSize="24" fill="#E0A800">=</text>
                  </svg>
                </div>
              )}
              <h2 className="status__text">{status}</h2>
            </div>

            <div className="board">
              <div className="board__grid">
                {squares.map(function (value, index) {
                  var isWinning = winningLine ? winningLine.indexOf(index) !== -1 : false;
                  return (
                    <Square
                      key={index}
                      value={value}
                      onClick={function () { handleSquareClick(index); }}
                      isWinning={isWinning}
                      disabled={isGameOver || value !== null}
                    />
                  );
                })}
              </div>
            </div>

            <div className="controls">
              <button className="btn btn--primary" onClick={handleRestart}>
                <RestartIcon />
                New Game
              </button>
              <button className="btn btn--ghost" onClick={handleResetScores}>
                <TrashIcon />
                Reset All
              </button>
            </div>
          </div>

          <div className="game-layout__right">
            <div className="history-panel">
              <div className="history-panel__header">
                <ClockIcon />
                <span>Move History</span>
              </div>
              <div className="history-panel__body">
                {moveHistory.length === 0 ? (
                  <div className="history-panel__empty">
                    <svg viewBox="0 0 80 80" width="56" height="56" fill="none" opacity="0.2">
                      <rect x="8" y="8" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" />
                      <rect x="48" y="8" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" />
                      <rect x="8" y="48" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" />
                      <rect x="48" y="48" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" />
                      <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                      <circle cx="60" cy="20" r="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                    </svg>
                    <span>No moves yet</span>
                  </div>
                ) : (
                  <ul className="history-panel__list">
                    {moveHistory.map(function (move) {
                      return (
                        <li key={move.moveNumber} className="history-panel__item">
                          <span className="history-panel__num">{move.moveNumber}</span>
                          <span className={'history-panel__icon history-panel__icon--' + move.player.toLowerCase()}>
                            {move.player === 'X' ? <XMarkMini /> : <OMarkMini />}
                          </span>
                          <ChevronIcon />
                          <span className="history-panel__pos">{getPositionLabel(move.position)}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app__footer">
        <p>Built with React &mdash; Pure, No External Libraries</p>
      </footer>
    </div>
  );
}

export default App;
