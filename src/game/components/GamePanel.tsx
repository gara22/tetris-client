import { useMemo } from 'react';
import { GAME_BACKGROUND_COLOR, GAME_BORDER_RADIUS } from '../../constants';
import { useStoreInContext } from '../store/store';
import Cell from './Cell';
import GameStatusBar from './GameStatusBar';

export const GamePanel = () => {
  const { gameState } = useStoreInContext((state) => state);
  const grid = useMemo(
    () => (gameState.grid.length === 0 ? Array(180).fill({}) : gameState.grid),
    [gameState.grid]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: GAME_BACKGROUND_COLOR,
        borderRadius: GAME_BORDER_RADIUS,
        padding: '20px',
        boxShadow: '10px 10px 0px #77c9ff',
        gap: '20px',
      }}
    >
      <GameStatusBar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 30px)',
          gridAutoRows: '1fr',
          border: `3px solid #f9b074`,
          // gap: '1px',
          borderRadius: GAME_BORDER_RADIUS,
          padding: '10px',
          justifyContent: 'center',
        }}
      >
        {grid.map((cell, i) => (
          <Cell
            key={i}
            row={cell.row}
            column={cell.column}
            display={cell.display}
            color={cell.color}
            blocked={cell.blocked}
          />
        ))}
      </div>
    </div>
  );
};
