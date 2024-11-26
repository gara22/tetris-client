import React from 'react';
import { useStoreInContext } from '../game/store/store';

const GameStatusBar: React.FC = () => {
  const { gameState, gameID } = useStoreInContext((state) => state);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
        <span>Lines Cleared {gameState.linesCleared}</span>
      </div>
      <small>
        Game ID: <b>{gameID}</b>
      </small>
    </div>
  );
};

export default GameStatusBar;
