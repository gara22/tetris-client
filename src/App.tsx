import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import GameStart from './components/GameStart';
import { GameStateProvider } from './game/store/provider';

function App() {
  const [gameIdInput, setGameIdInput] = useState<string>('');
  const [gameId, setGameId] = useState<string | null>(null);

  const newGame = async () => {
    const response = await fetch('http://localhost:8080/new-game', {
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

export default App;
