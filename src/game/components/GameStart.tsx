import React from 'react';

type GameStartProps = {
  gameIdInput: string | null;
  setGameIdInput: React.Dispatch<React.SetStateAction<string | null>>;
  setGameID: (gameId: string) => void;
  newGame: () => void;
};

const GameStart: React.FC<GameStartProps> = ({
  gameIdInput,
  setGameIdInput,
  setGameID,
  newGame,
}) => {
  return (
    <div>
      <h2>Welcome to the game! Provide game id or start a new game</h2>
      <input
        type="text"
        value={gameIdInput || ''}
        onChange={(e) => setGameIdInput(e.target.value)}
      />
      <button onClick={() => setGameID(gameIdInput || '')}>Join Game</button>
      <button onClick={newGame}>New Game</button>
    </div>
  );
};

export default GameStart;
