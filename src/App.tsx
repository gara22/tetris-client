import { useState } from 'react';
import './App.css';
import Game from './game/components/Game';
import GameStart from './game/components/GameStart'; // Import GameStart
import { GameStateProvider } from './game/store/provider';
import { SERVER_HOST } from './config';

function App() {
  const [gameId, setGameId] = useState<string | null>(null);

  const newGame = async () => {
    const response = await fetch(`https://${SERVER_HOST}/new-game`, {
      method: 'POST',
    });
    const json = await response.json();
    setGameId(json.gameId);
  };

  if (!gameId) {
    return <GameStart setGameID={setGameId} newGame={newGame} />;
  }

  return (
    <GameStateProvider gameId={gameId}>
      <Game newGame={newGame} />
    </GameStateProvider>
  );
}

export default App;
