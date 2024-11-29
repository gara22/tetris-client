import React from 'react';
import { ansiToHex } from '../../utils';
import { GAME_BACKGROUND_COLOR, GAME_BORDER_RADIUS } from '../../constants';

type CellProps = {
  row: number;
  column: number;
  display: string;
  color: string;
  blocked: boolean;
};

const Cell: React.FC<CellProps> = ({ row, column, display, color }) => {
  const colorMap: { [key: string]: string } = {
    X: 'red',
    '0': GAME_BACKGROUND_COLOR,
  };

  const backgroundColor = colorMap[display] || ansiToHex(color) || 'hotpink';
  return (
    <div
      style={{
        // outline: backgroundColor === 'white' ? '' : '1px solid black',
        backgroundColor: backgroundColor,
        aspectRatio: '1/1',
        border: '1px solid #2f3a58',
        borderRadius: '7px',
        // minHeight: '20px',
        // minWidth: '20px',
        // fontSize: '10px',
      }}
    ></div>
  );
};

export default Cell;
