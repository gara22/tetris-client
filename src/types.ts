export type Cell = {
  row: number;
  column: number;
  display: string;
  color: string;
  blocked: boolean;
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
  isGamePaused: boolean;
};

export type GameState = {
  grid: Cell[];
  level: number;
  linesCleared: number;
  isGameOver: boolean;
  score: number;
  isGamePaused: boolean;
};

export type MoveMessage = {
  direction: string;
  type: 'move';
};

export type PauseMessage = {
  type: 'pause';
};

export type ResumeMessage = {
  type: 'resume';
};
