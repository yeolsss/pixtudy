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
    this.scene.start("CharacterScenes");
  }

  update() {}
}
