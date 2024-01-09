type Player = {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  movingLeft?: boolean;
  movingRight?: boolean;
  movingUp?: boolean;
  movingDown?: boolean;
  lastDirection?: string;
};

type Players = {
  [id: string]: Player;
};
