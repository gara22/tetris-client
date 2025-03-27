import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import { SERVER_HOST } from '../../config';

type LeaderboardEntry = {
  player: string;
  score: number;
};

type LeaderboardProps = {
  onClose: () => void;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`https://${SERVER_HOST}/scores`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the leaderboard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Leaderboard</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {index + 1}. {entry.player} - {entry.score}
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Leaderboard;
