import { useEffect, useState } from 'react'
import './App.css'

function App() {

  var ws: WebSocket
  useEffect(() => {
    ws = new WebSocket('ws://localhost:8080/ws')
    ws.onopen = () => {
      console.log('connected')
    }
    ws.onmessage = (event) => {
      console.log(event.data)
      const json = JSON.parse(event.data)
      console.log(json)
      const tiles: Record<string, Cell> = json.tiles
      const arr: Cell[] = Object.values(tiles)
      arr.sort((a, b) => {
        if (a.column === b.column) {
          return a.row - b.row
        }
        return a.column - b.column
      }
      )
      // set the state of cells to the array of cells

      setCells(arr)

    }
    return () => {
      console.log('disconnected')
      ws.close()
    }
  }, [])

  const [cells, setCells] = useState<Cell[]>([])

  // setup an event handler that listens for keydown events and calls /move API with the key pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (!direction.includes(event.key)) {
        return
      }
      const keyMap: { [key: string]: string } = {
        'ArrowUp': 'UP',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }
      ws.send(JSON.stringify({ direction: keyMap[event.key] }))
    }
    window.addEventListener('keydown', handleKeyDown)
    console.log('event listener added')
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])



  //create a gird of 21x11. Each cell is 50x50px and has a border of 1px
  return (
    <div style={
      {
        display: 'grid',
        gridTemplateColumns: 'repeat(11, 50px)',
        gridTemplateRows: 'repeat(21, 50px)',
        gap: '1px',
        border: '1px solid black',
        width: '550px',
        height: '1100px'
      }
    }>
      {cells.map((cell, i) => (
        <Cell key={i} row={cell.row} column={cell.column} display={cell.display} color={cell.color} />
      ))}
    </div>
  )

}

//create a cell component that will be used in the grid. it has x and y coordinates and display value
const Cell = ({ row, column, display }: Cell) => {
  const colorMap: { [key: string]: string } = {
    'X': 'black',
    'O': 'white',
    'I': 'red'
  }
  return (
    <div style={
      {
        border: '1px solid black',
        backgroundColor: colorMap[display],
      }
    } >
      {row}, {column}
    </div>
  )
}

type Cell = {
  row: number,
  column: number,
  display: string
  color: string
}

type MoveResponse = {
  tiles: Record<string, Cell>
}

export default App
