import { CDN_HOST } from '../../config';
import { PauseMessage, ResumeMessage } from '../../types';
import { useStoreInContext } from '../store/store';
import styles from './SidePanel.module.css';

export const SidePanel = () => {
  const { ws, gameState } = useStoreInContext((state) => state);

  const handlePause = () => {
    const message: PauseMessage = {
      type: 'pause',
    };
    ws.send(JSON.stringify(message));
  };

  const handleResume = () => {
    const message: ResumeMessage = {
      type: 'resume',
    };
    ws.send(JSON.stringify(message));
  };

  return (
    <div className={styles.sidePanel}>
      <div className={styles.sidePanelContent}>
        <Item>
          <div>{gameState.nextShape || 'N/A'}</div>
          <div>Next Block</div>
        </Item>
        <Item>
          <div>0</div>
          <div>High Score</div>
        </Item>
        <Item>
          {gameState.isGamePaused ? (
            <button disabled={gameState.isGameOver} onClick={handleResume}>
              Resume
            </button>
          ) : (
            <button disabled={gameState.isGameOver} onClick={handlePause}>
              Pause
            </button>
          )}
        </Item>
        <div className={styles.logoContainer}>
          <img
            src={`https://${CDN_HOST}/tetris-client/chill_guy.png`}
            alt="Tetris Logo"
            className={styles.logo}
          />
        </div>
      </div>
    </div>
  );
};

const Item = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.item}>{children}</div>;
};
