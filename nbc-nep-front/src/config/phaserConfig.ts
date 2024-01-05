import io, { Socket } from "socket.io-client";
import Phaser from "phaser";

const RUN = 350;
const WORK = 200;

export class PhaserConfig extends Phaser.Scene {
  character?: Phaser.Physics.Arcade.Sprite;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  // characterSpeed
  isRunning: boolean = false;
  runKey?: Phaser.Input.Keyboard.Key;
  lastDirection?: string; // 마지막으로 바라본 방향을 추적하는 변수
  private socket?: Socket;

  constructor() {
    super({ key: "PhaserConfig" });
  }

  preload() {
    this.load.spritesheet("character", "/NPC11.png", {
      frameWidth: 32,
      frameHeight: 60,
    });
    this.load.image("apartment", "/Apartment.png");
  }

  create() {
    this.socket = io("http://localhost:3001", { withCredentials: true });

    this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
    this.physics.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);

    this.add.image(400, 300, "apartment");
    this.character = this.physics.add.sprite(400, 300, "character", 0);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 4,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 10,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("character", {
        start: 7,
        end: 8,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("character", {
        start: 1,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.character.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.character, true);
    if (this.cameras.main.deadzone) {
      const graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(
        200,
        200,
        this.cameras.main.deadzone.width,
        this.cameras.main.deadzone.height
      );
    }
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.runKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  update() {
    const cam = this.cameras.main;

    if (this.runKey && Phaser.Input.Keyboard.JustDown(this.runKey)) {
      this.isRunning = !this.isRunning;
    }

    let characterSpeed = this.isRunning ? RUN : WORK;

    // 이동 벡터를 초기화하고 animationKey 값을 설정합니다.
    let velocity = new Phaser.Math.Vector2();
    let animationKey = this.lastDirection; // 마지막 방향을 기본값으로 설정합니다.

    if (this.cursors?.left.isDown) {
      velocity.x = -1;
      animationKey = "left";
      this.lastDirection = animationKey; // 마지막 방향을 업데이트합니다.
    } else if (this.cursors?.right.isDown) {
      velocity.x = 1;
      animationKey = "right";
      this.lastDirection = animationKey; // 마지막 방향을 업데이트합니다.
    }

    if (this.cursors?.up.isDown) {
      velocity.y = -1;
      if (!this.cursors?.left.isDown && !this.cursors?.right.isDown) {
        // 좌/우 입력이 없을 때만 상단 애니메이션을 설정합니다.
        this.lastDirection = "up";
      }
    } else if (this.cursors?.down.isDown) {
      velocity.y = 1;
      if (!this.cursors?.left.isDown && !this.cursors?.right.isDown) {
        // 좌/우 입력이 없을 때만 하단 애니메이션을 설정합니다.
        this.lastDirection = "down";
      }
    }

    // 벡터를 정규화하여 대각선 이동 시에도 일정한 속도를 유지하도록 합니다.
    velocity.normalize();

    // 캐릭터의 속도를 설정합니다.
    this.character?.setVelocity(
      velocity.x * characterSpeed,
      velocity.y * characterSpeed
    );

    if (
      this.cursors?.left.isDown ||
      this.cursors?.right.isDown ||
      this.cursors?.up.isDown ||
      this.cursors?.down.isDown
    ) {
      // 이동 중인 경우 이동 방향에 맞는 애니메이션을 재생합니다.
      if (animationKey) {
        this.character?.anims.play(animationKey, true);
      }
    } else {
      // 이동 입력이 없는 경우 멈춘 상태의 프레임을 설정합니다.
      this.character?.anims.stop();

      let frameIndex;
      switch (this.lastDirection) {
        case "left":
          frameIndex = 3;
          break;
        case "right":
          frameIndex = 9;
          break;
        case "up":
          frameIndex = 6;
          break;
        case "down":
          frameIndex = 0;
          break;
        default:
          frameIndex = 0; // 기본값으로 하방향 설정
          break;
      }
      this.character?.setFrame(frameIndex);
    }
    // 캐릭터의 속도를 설정합니다.
    this.character?.setVelocity(
      velocity.x * characterSpeed,
      velocity.y * characterSpeed
    );
  }
}
