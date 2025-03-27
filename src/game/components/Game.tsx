import React from 'react';
import { GAME_BACKGROUND_COLOR } from '../../constants';
import GameOver from './GameOver';
import { useStoreInContext } from '../store/store';
import { GamePanel } from './GamePanel';
import { SidePanel } from './SidePanel';

const Game: React.FC<{ newGame: VoidFunction }> = ({ newGame }) => {
  const { gameState, gameID } = useStoreInContext((state) => state);

  if (gameState.isGameOver) {
    return <GameOver newGame={newGame} gameId={gameID} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        color: GAME_BACKGROUND_COLOR,
      }}
    >
      <GamePanel />
      <SidePanel />
    </div>
  );
};

export default Game;
