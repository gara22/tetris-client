import React from 'react';
import Cell from './Cell';
import GameOver from './GameOver';
import { useStoreInContext } from '../game/store/store';
import GameStatusBar from './GameStatusBar';

const Game: React.FC<{ newGame: VoidFunction }> = ({ newGame }) => {
  const { gameState } = useStoreInContext((state) => state);

  if (gameState.isGameOver) {
    return <GameOver newGame={newGame} />;
  }

  return (
    <>
      <GameStatusBar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 30px)',
          gridTemplateRows: 'repeat(21, 30px)',
          gap: '1px',
          border: '1px solid black',
        }}
      >
        {gameState?.grid.map((cell, i) => (
          <Cell
            key={i}
            row={cell.row}
            column={cell.column}
            display={cell.display}
            color={cell.color}
            Blocked={cell.Blocked}
          />
        ))}
      </div>
    </>
  );
};

export default Game;
