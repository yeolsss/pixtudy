export type Player = {
  rotation: number;
  x: number;
  y: number;
  socketId: string;
  playerId: string;
  nickname: string;
  character: string;
  frame: string;
};

export type Players = {
  [id: string]: Player;
};

export type MapData = {
  objLayer: Phaser.Tilemaps.TilemapLayer | null;
  tileLayer: Phaser.Tilemaps.TilemapLayer | null;
  map: Phaser.Tilemaps.Tilemap;
};

export type Chat = {
  userId: string;
  message: string;
};
