import React, { useState } from 'react';
import './GameOver.css';
import Leaderboard from './Leaderboard';
import { SERVER_HOST } from '../../config';

type GameOverProps = {
  newGame: () => void;
  gameId: string;
};

const GameOver: React.FC<GameOverProps> = ({ newGame, gameId }) => {
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }

    try {
      const response = await fetch(`http://${SERVER_HOST}/add-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName: username, gameId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit username');
      }

      alert('Username submitted successfully!');
      setIsModalOpen(false);
      setIsLeaderboardOpen(true); // Open leaderboard modal
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting your username.');
    }
  };

  const handleSkip = () => {
    setIsModalOpen(false);
    setIsLeaderboardOpen(true); // Open leaderboard modal
  };

  return (
    <div>
      <h1>Game Over</h1>
      <div className="game-over-buttons">
        <button onClick={newGame}>New Game</button>
        <button onClick={() => setIsLeaderboardOpen(true)}>Leaderboard</button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Submit Your Username</h2>
            <p className="info-text">
              Only if you provide your name, then you will get on the
              leaderboard.
            </p>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleSubmit}>Submit</button>
              <button className="decline-button" onClick={handleSkip}>
                Nah, I'm cool
              </button>
            </div>
          </div>
        </div>
      )}
      {isLeaderboardOpen && (
        <Leaderboard onClose={() => setIsLeaderboardOpen(false)} />
      )}
    </div>
  );
};

export default GameOver;
