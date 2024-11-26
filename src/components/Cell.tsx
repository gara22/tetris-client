import React from 'react';
import { ansiToHex } from '../utils';

type CellProps = {
  row: number,
  column: number,
  display: string,
  color: string,
  Blocked: boolean
}

const Cell: React.FC<CellProps> = ({ row, column, display, color, Blocked }) => {
  const colorMap: { [key: string]: string } = {
    'X': 'black',
    '0': 'white',
  }

  const backgroundColor = colorMap[display] || ansiToHex(color) || 'hotpink'
  return (
    <div style={{
      border: '1px solid black',
      backgroundColor: backgroundColor,
      fontSize: '10px',
    }}>
      {display[display.length - 1] ? display[display.length - 1] : `${row} ${column}`}
    </div>
  )
}

export default Cell;