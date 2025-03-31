import React from 'react';
import GameOver from './GameOver';
import { useStoreInContext } from '../store/store';
import { GamePanel } from './GamePanel';
import { SidePanel } from './SidePanel';
import MobileControls from './MobileControls'; // Import the MobileControls component
import styles from './Game.module.css';

const Game: React.FC<{ newGame: VoidFunction }> = ({ newGame }) => {
  const { gameState, gameID } = useStoreInContext((state) => state);

  if (gameState.isGameOver) {
    return <GameOver newGame={newGame} gameId={gameID} />;
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gamePanel}>
        <GamePanel />
        <div className={styles.sidePanelContainer}>
          <SidePanel />
        </div>
      </div>
      <div className={styles.mobileControls}>
        <MobileControls />
      </div>
    </div>
  );
};

export default Game;
