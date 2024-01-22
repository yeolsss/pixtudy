import Phaser from "phaser";

export class SetupScene extends Phaser.Scene {
  constructor() {
    super({ key: "SetupScene" });
  }

  preload() {
    // 로딩 바 그래픽 생성
    /*const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    // 로딩 이벤트 핸들러
    this.load.on("progress", (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });*/

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
    /* this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
    });*/
  }

  create() {
    this.scene.start("SceneClass");
  }

  update() {}
}
