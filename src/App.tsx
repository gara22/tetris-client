import { useState } from 'react';
import './App.css';
import Game from './game/components/Game';
import GameStart from './game/components/GameStart';
import { GameStateProvider } from './game/store/provider';
import { SERVER_HOST } from './config';

function App() {
  const [gameIdInput, setGameIdInput] = useState<string | null>(
    getGameIdFromLocalStorage()
  );
  const [gameId, setGameId] = useState<string | null>(null);

  const newGame = async () => {
    const response = await fetch(`http://${SERVER_HOST}/new-game`, {
      method: 'POST',
    });
    const json = await response.json();
    setGameId(json.gameId);
  };

  if (!gameId) {
    return (
      <GameStart
        gameIdInput={gameIdInput}
        setGameIdInput={setGameIdInput}
        setGameID={setGameId}
        newGame={newGame}
      />
    );
  }

  return (
    <GameStateProvider gameId={gameId}>
      <Game newGame={newGame} />
    </GameStateProvider>
  );
}

const getGameIdFromLocalStorage = () => {
  return localStorage.getItem('gameId');
};

export default App;
