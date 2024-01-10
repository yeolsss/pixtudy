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

type MapData = {
  objLayer: Phaser.Tilemaps.TilemapLayer | null;
  tileLayer: Phaser.Tilemaps.TilemapLayer | null;
  map: Phaser.Tilemaps.Tilemap;
};
