import Phaser from "phaser";

export class ScenesMain extends Phaser.Scene {
  constructor() {
    super({ key: "ScenesMain" });
  }

  preload() {
    this.load.image("tiles", "/assets/tiles/gather_pixel_spritesheet.png");
    this.load.tilemapTiledJSON("basic_map", "/assets/map/basic_map.json");
    this.load.spritesheet("character", "/assets/characters/NPC11.png", {
      frameWidth: 32,
      frameHeight: 60,
    });
  }

  create() {
    // map setting
    // const map = this.make.tilemap({
    //   key: "basic_map",
    //   tileWidth: 32,
    //   tileHeight: 32,
    // });

    // const tileSet = map.addTilesetImage("tile1", "tiles");
    // const tileLayer = map.createLayer("tileLayer", tileSet!, 0, 0);
    // const objLayer = map.createLayer("objectLayer", tileSet!, 0, 0);
    // console.log(map.tileWidth);
    // objLayer?.setCollisionByProperty({ collides: true });
    this.scene.start("CharacterScenes");
  }

  update() {}
}
