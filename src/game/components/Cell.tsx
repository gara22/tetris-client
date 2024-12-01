import React from 'react';
import {
  CELL_BLUE,
  CELL_GREEN,
  CELL_LIGHT_BLUE,
  CELL_ORANGE,
  CELL_PURPLE,
  CELL_RED,
  CELL_YELLOW,
  GAME_BACKGROUND_COLOR,
} from '../../constants';
import { CellKind } from '../../types';

type CellProps = {
  row: number;
  column: number;
  display: CellKind;
  color: string;
  blocked: boolean;
};

const colorMap: Record<CellKind, string> = {
  X: 'black',
  '0': GAME_BACKGROUND_COLOR,
  L1: CELL_ORANGE,
  L2: CELL_BLUE,
  Z1: CELL_GREEN,
  Z2: CELL_RED,
  I: CELL_LIGHT_BLUE,
  O: CELL_YELLOW,
  T: CELL_PURPLE,
};

const Cell: React.FC<CellProps> = ({ row, column, display, color }) => {
  const backgroundColor = colorMap[display];
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        aspectRatio: '1/1',
        border: '1px solid #2f3a58',
        borderRadius: '7px',
      }}
    ></div>
  );
};

export default Cell;
