import React, { useState } from 'react';
import './GameStart.css';
import Leaderboard from './Leaderboard';

type GameStartProps = {
  setGameID: (gameId: string) => void;
  newGame: () => Promise<void>;
};

const GameStart: React.FC<GameStartProps> = ({ setGameID, newGame }) => {
  const [gameIdInput, setGameIdInput] = useState<string | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  return (
    <div className="game-start-container">
      <h1 className="game-start-title">Welcome to Tetris</h1>
      <div className="input-container">
        <label htmlFor="game-id-input" className="input-label">
          Enter a Game ID to join an existing game:
        </label>
        <input
          id="game-id-input"
          type="text"
          placeholder="Enter your game ID"
          value={gameIdInput || ''}
          onChange={(e) => setGameIdInput(e.target.value)}
        />
        <button
          className="join-game-button"
          onClick={() => {
            if (gameIdInput) {
              setGameID(gameIdInput);
            } else {
              alert('Please enter a valid Game ID.');
            }
          }}
        >
          Join Game
        </button>
      </div>
      <div className="button-group">
        <button onClick={newGame}>Start New Game</button>
        <button onClick={() => setIsLeaderboardOpen(true)}>Leaderboard</button>
      </div>
      {isLeaderboardOpen && (
        <Leaderboard onClose={() => setIsLeaderboardOpen(false)} />
      )}
    </div>
  );
};

export default GameStart;
