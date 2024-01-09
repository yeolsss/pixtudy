type Player = {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
};

type Players = {
  [id: string]: Player;
};
