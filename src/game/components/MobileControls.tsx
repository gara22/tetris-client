import React from 'react';
import { useStoreInContext } from '../store/store';
import { MoveMessage } from '../../types';
import styles from './MobileControls.module.css';

const MobileControls: React.FC = () => {
  const gameStore = useStoreInContext((state) => state);

  const sendMoveMessage = (direction: string) => {
    const message: MoveMessage = {
      direction,
      type: 'move',
    };
    gameStore.ws.send(JSON.stringify(message));
  };

  return (
    <div className={styles.controlsContainer}>
      <button onClick={() => sendMoveMessage('up')}>Up</button>
      <div className={styles.horizontalControls}>
        <button onClick={() => sendMoveMessage('left')}>Left</button>
        <button onClick={() => sendMoveMessage('down')}>Down</button>
        <button onClick={() => sendMoveMessage('right')}>Right</button>
      </div>
    </div>
  );
};

export default MobileControls;
