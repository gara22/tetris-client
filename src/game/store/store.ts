import { Cell, GameState, GameStateMessage } from '../../types';
import { createStore, StoreApi, useStore } from 'zustand';
import React, { useContext } from 'react';
import { SERVER_HOST } from '../../config';

export type GameProviderState = {
  gameID: string;
  gameState: GameState;
  ws: WebSocket;
  joinGame: (gameID: string) => void;
};

const initialGameState: GameState = {
  grid: [],
  level: 1,
  linesCleared: 0,
  isGameOver: false,
  score: 0,
  isGamePaused: false,
  nextShape: '',
};

export const createGameStore = (
  gameId: string
  // setGameId: (gameId: string) => void
) => {
  const socketConnection = new WebSocket(
    `wss://${SERVER_HOST}/ws?id=${gameId}`
  );

  localStorage.setItem('gameId', gameId);

  const newStore = createStore<GameProviderState>((set) => {
    return {
      gameID: gameId,
      gameState: initialGameState,
      ws: socketConnection,
      joinGame: (gameID) => set({ gameID }),
    };
  });

  socketConnection.onmessage = (event) => {
    const {
      grid: { tiles },
      isGameOver,
      level,
      linesCleared,
      score,
      isGamePaused,
      nextShape,
    } = JSON.parse(event.data) as GameStateMessage;
    const arr: Cell[] = Object.values(tiles)
      .sort((a, b) =>
        a.column === b.column ? a.row - b.row : a.column - b.column
      )
      .filter((cell) => cell.display !== 'X');
    const newGameState = {
      grid: arr,
      isGameOver,
      level,
      linesCleared,
      score,
      isGamePaused,
      nextShape,
    };
    newStore.setState({ gameState: newGameState });
    // console.log('store state', newStore.getState());
  };

  socketConnection.onerror = () => {
    throw new Error('websocket error');
  };

  socketConnection.onopen = () => {
    newStore.setState({ ws: socketConnection });
  };

  return newStore;
};

export const GameContext = React.createContext<
  StoreApi<GameProviderState> | undefined
>(undefined);

export const useStoreInContext = (
  selector: (state: GameProviderState) => GameProviderState
) => {
  const store = useContext(GameContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return useStore(store, selector);
};
