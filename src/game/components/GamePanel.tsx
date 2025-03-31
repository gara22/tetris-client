import { useMemo } from 'react';
import { useStoreInContext } from '../store/store';
import Cell from './Cell';
import GameStatusBar from './GameStatusBar';
import styles from './GamePanel.module.css';

export const GamePanel = () => {
  const { gameState } = useStoreInContext((state) => state);
  const grid = useMemo(
    () => (gameState.grid.length === 0 ? Array(180).fill({}) : gameState.grid),
    [gameState.grid]
  );

  return (
    <div className={styles.gamePanel}>
      <GameStatusBar />
      <div className={styles.gameGrid}>
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
