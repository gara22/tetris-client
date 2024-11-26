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
  isGameOver: boolean;
};

export type GameState = {
  grid: Cell[];
  isGameOver: boolean;
};
