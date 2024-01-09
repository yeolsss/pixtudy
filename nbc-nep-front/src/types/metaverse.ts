type Player = {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  frame: string;
};

type Players = {
  [id: string]: Player;
};
