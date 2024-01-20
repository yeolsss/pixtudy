import Phaser from "phaser";

export class SetupScene extends Phaser.Scene {
  constructor() {
    super({ key: "SetupScene" });
  }

  preload() {
    this.load.image("tiles", "/assets/tiles/gather_pixel_spritesheet.png");
    this.load.tilemapTiledJSON("basic_map", "/assets/map/basic_map.json");

    const characters = [
      "ginger",
      "NPC1",
      "NPC2",
      "NPC3",
      "NPC4",
      "NPC5",
      "NPC6",
      "NPC7",
      "NPC8",
      "NPC9",
      "NPC10",
      "NPC11",
      "NPC12",
      "NPC13",
      "NPC14",
      "NPC15",
      "NPC16",
      "NPC17",
      "NPC18",
      "NPC19",
      "NPC20",
      "NPC21",
      "NPC22",
      "NPC23",
      "NPC24",
      "NPC25",
      "NPC26",
      "pinkybonz",
    ];
    characters.forEach((character) => {
      this.load.spritesheet(
        character,
        `/assets/characters/presets/${character}.png`,
        {
          frameWidth: 32,
          frameHeight: 60,
        }
      );
    });
  }

  create() {
    this.scene.start("SceneClass");
  }

  update() {}
}
