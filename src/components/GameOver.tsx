import React from 'react';

type GameOverProps = {
  newGame: () => void
}

const GameOver: React.FC<GameOverProps> = ({ newGame }) => {
  return (
    <div>
      Game Over
      <button onClick={newGame}>Start Game</button>
    </div>
  );
}

export default GameOver;