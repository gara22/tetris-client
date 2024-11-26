export type Cell = {
  row: number;
  column: number;
  display: string;
  color: string;
  Blocked: boolean;
};

type Grid = {
  tiles: Record<string, Cell>;
};

export type GameStateMessage = {
  grid: Grid;
  level: number;
  linesCleared: number;
  isGameOver: boolean;
  score: number;
};

export type GameState = {
  grid: Cell[];
  level: number;
  linesCleared: number;
  isGameOver: boolean;
  score: number;
};
