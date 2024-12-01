export type Cell = {
  row: number;
  column: number;
  display: CellKind;
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
  nextShape: string;
};

export type GameState = Omit<GameStateMessage, 'grid'> & {
  grid: Cell[];
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

export type CellKind = 'L1' | 'L2' | 'Z1' | 'Z2' | 'I' | 'O' | 'T' | 'X' | '0';
