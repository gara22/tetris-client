import { PropsWithChildren, useEffect, useState } from 'react';
import { createGameStore, GameContext } from './store';
import { MoveMessage } from '../../types';

export const GameStateProvider: React.FC<
  PropsWithChildren<{
    gameId: string;
  }>
> = ({ gameId, children }) => {
  const [gameStore, setGameStore] =
    useState<ReturnType<typeof createGameStore>>();

  useEffect(() => {
    const newStore = createGameStore(gameId);

    const state = newStore.getState();

    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (!direction.includes(event.key)) return;
      const keyMap: { [key: string]: string } = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      const message: MoveMessage = {
        direction: keyMap[event.key],
        type: 'move',
      };
      state.ws.send(JSON.stringify(message));
    };

    window.addEventListener('keydown', handleKeyDown);

    setGameStore(newStore);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      state.ws.close();
      localStorage.removeItem('gameId');
    };
  }, [gameId]);

  // TODO: maybe show a loading spinner here or gameStart component
  if (!gameStore) return null;

  return (
    <GameContext.Provider value={gameStore}>{children}</GameContext.Provider>
  );
};
