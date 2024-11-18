import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {

  const [gameID, setGameID] = useState<string | null>(null)
  const [gameIdInput, setGameIdInput] = useState<string>('')
  const [gameState, setGameState] = useState<GameState>()
  const [ws, setWs] = useState<WebSocket | null>(null)

  const newGame = useCallback(function () {
    fetch('http://localhost:8080/new-game', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setGameID(json.gameId)
      })
  }, [])

  useEffect(() => {
    if (!gameID) {
      return
    }

    if (ws) {
      ws.close()
      setWs(null)
      setGameState(undefined)
    }
    // connect to the websocket server, attach gameID to header
    const socketConnection = new WebSocket('ws://localhost:8080/ws?id=' + gameID)

    setWs(socketConnection)

    socketConnection.onopen = () => {
      console.log('connected')
    }
    socketConnection.onmessage = (event) => {
      const json = JSON.parse(event.data)
      console.log(json)
      const tiles: Record<string, Cell> = json.grid.tiles
      const arr: Cell[] = Object.values(tiles)
      arr.sort((a, b) => {
        if (a.column === b.column) {
          return a.row - b.row
        }
        return a.column - b.column
      }
      )

      const gameState: GameState = {
        grid: arr,
        isGameOver: json.isGameOver
      }

      setGameState(gameState)

    }
    return () => {
      console.log('disconnected')
      socketConnection.close()
    }
  }, [gameID])




  // setup an event handler that listens for keydown events and calls /move API with the key pressed
  useEffect(() => {
    console.log(ws)
    if (!ws?.OPEN) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (!direction.includes(event.key)) {
        return
      }
      const keyMap: { [key: string]: string } = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }
      console.log('sending', keyMap[event.key])
      ws.send(JSON.stringify({ direction: keyMap[event.key] }))
    }
    window.addEventListener('keydown', handleKeyDown)
    console.log('event listener added')
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ws?.url])



  if (!gameID) {
    return (
      <div>
        <h2>Welcome to the game! Provide game id or start a new game</h2>
        <input type="text" value={gameIdInput} onChange={e => setGameIdInput(e.target.value)}  />
        <button onClick={() => setGameID(gameIdInput)}>Join Game</button>

        <button onClick={newGame}>New Game</button>
      </div>
    )
  }

  // if game is over, display game over message
  if (gameState?.isGameOver) {
    return <div>Game Over
      <button onClick={newGame}>Start Game</button>
    </div>
  }
  // make the grid fit on the screen
  return (
    <>
      <div>GameId: {gameID}</div>

      <div style={
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 35px)',
          gridTemplateRows: 'repeat(21, 35px)',
          gap: '1px',
          border: '1px solid black',
          // width: '200px',
          // height: '5500px'
        }
      }>
        {gameState?.grid.map((cell, i) => (
          <Cell key={i} row={cell.row} column={cell.column} display={cell.display} color={cell.color} Blocked={cell.Blocked} />
        ))}
      </div>
    </>
  )

}

//create a cell component that will be used in the grid. it has x and y coordinates and display value
const Cell = ({ row, column, display, color, Blocked }: Cell) => {
  const colorMap: { [key: string]: string } = {
    'X': 'black',
    '0': 'white',
  }

  const backgroundColor = colorMap[display] || ansiToHex(color) || 'hotpink'
  return (
    <div style={
      {
        border: '1px solid black',
        backgroundColor: backgroundColor,
        fontSize: '10px',
      }
    } >
      {display[display.length - 1] ? display[display.length - 1] : `${row} ${column}`}
      {/* {row}, {column} */}
    </div>
  )
}

type Cell = {
  row: number,
  column: number,
  display: string
  color: string
  Blocked: boolean
}

type MoveResponse = {
  tiles: Record<string, Cell>
}

function ansiToHex(ansiCode: string): string | null {
  // Extract the numeric part of the ANSI code
  const colorCode = parseInt(ansiCode.match(/\d+/)?.[0] || '', 10) - 30;

  if (colorCode < 0 || colorCode > 7) return null;

  // Programmatically generate the RGB values for the standard 8 colors
  const rgb: [number, number, number] = [
    (colorCode & 1) * 255,         // Red component
    ((colorCode >> 1) & 1) * 255,  // Green component
    ((colorCode >> 2) & 1) * 255   // Blue component
  ];

  // Convert RGB to hex
  const hex = rgb.map(val => val.toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
}

type GameState = {
  grid: Cell[],
  isGameOver: boolean
}


export default App
