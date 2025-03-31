import React from 'react';
import { useStoreInContext } from '../store/store';

const GameStatusBar: React.FC = () => {
  const { gameState } = useStoreInContext((state) => state);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'whitesmoke',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Level {gameState.level}</span>
        <span>Score {gameState.score}</span>
      </div>
      <small>{/* Game ID: <b>{gameID}</b> */}</small>
    </div>
  );
};

export default GameStatusBar;
