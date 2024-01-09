import { CurrentPlayer } from "@/games/CurrentPlayer";
import { OtherPlayersGroup } from "@/games/OtherPlayersGroup";
import Phaser from "phaser";
import io, { Socket } from "socket.io-client";

const RUN = 350;
const WORK = 250;

/**
 * CharacterScenes 클래스는 Phaser.Scene을 확장해서 게임 캐릭터의 동작을 관리한다.
 */
export class CharacterScenes extends Phaser.Scene {
  character?: CurrentPlayer;
  otherPlayers?: OtherPlayersGroup;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  runKey?: Phaser.Input.Keyboard.Key;
  lastDirection?: string; // 마지막으로 바라본 방향을 추적하는 변수
  private socket?: Socket;
  isRunning: boolean = false;

  constructor() {
    super({ key: "CharacterScenes" });
  }
  preload() {}

  create(data: any) {
    // const { map, tileSet, tileLayer, objLayer } = data;
    const map = this.make.tilemap({
      key: "basic_map",
      tileWidth: 32,
      tileHeight: 32,
    });

    const tileSet = map.addTilesetImage("tile1", "tiles");
    const tileLayer = map.createLayer("tileLayer", tileSet!, 0, 0);
    const objLayer = map.createLayer("objectLayer", tileSet!, 0, 0);
    console.log(map.tileWidth);
    objLayer?.setCollisionByProperty({ collides: true });

    console.log(objLayer);
    // socket setting
    this.otherPlayers = new OtherPlayersGroup(this);
    this.socket = io("http://localhost:3001");

    // current player setting
    this.socket.on("currentPlayers", (players: Players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket?.id) {
          this.addPlayer(players[id], objLayer!);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });
    });

    this.socket.on("newPlayer", (playerInfo: Player) => {
      this.otherPlayers?.addPlayer(playerInfo);
    });

    this.socket.on("playerDisconnected", (playerId: string) => {
      this.otherPlayers?.removePlayer(playerId);
    });

    this.createAnimations();

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.runKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.socket.on("playerMoved", (playerInfo: Player) => {
      this.otherPlayers?.movePlayer(playerInfo);
    });
  }

  /**
   * 게임의 상태를 업데이트한다. Phaser 게임 루프에서 자동으로 호출된다.
   */

  update() {
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

    if (this.character && this.character.body) {
      this.character.setVelocity(
        velocity.x * characterSpeed,
        velocity.y * characterSpeed
      );
    }

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
    this.emitPlayerMovement();
  }

  /**
   * 각 캐릭터별로 애니메이션을 추가한다.
   */
  createAnimations() {
    const animations = [
      { key: "left", start: 4, end: 5 },
      { key: "right", start: 10, end: 11 },
      { key: "up", start: 7, end: 8 },
      { key: "down", start: 1, end: 2 },
    ];

    animations.forEach(({ key, start, end }) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers("character", { start, end }),
        frameRate: 5,
        repeat: -1,
      });
    });
  }

  /**
   * 캐릭터를 게임에 추가한다.
   * @param {Player} playerInfo - 플레이어 정보.
   * @param {Phaser.Tilemaps.TilemapLayer} objLayer - 충돌을 처리할 타일맵 레이어.
   */
  addPlayer(playerInfo: Player, objLayer: Phaser.Tilemaps.TilemapLayer) {
    /*this.character = this.physics.add.existing(
      new ExtendedSprite(this, playerInfo.x, playerInfo.y, "character", 0)
    );*/
    this.character = this.physics.add.sprite(
      playerInfo.x,
      playerInfo.y,
      "character",
      0
    );
    // 몸체 크기
    this.character.body?.setSize(32, 32);
    // 몸체 위치
    this.character.setCollideWorldBounds(true);
    this.character.body?.setOffset(0, 25);
    this.physics.add.collider(this.character, objLayer!);
    this.cameras.main.startFollow(this.character, true);
  }

  /**
   * 다른 플레이어를 게임에 추가한다.
   * @param {Player} playerInfo - 추가할 플레이어의 정보.
   */
  addOtherPlayers(playerInfo: Player) {
    this.otherPlayers?.addPlayer(playerInfo);
  }

  /**
   * 플레이어의 움직임을 서버에 전송한다.
   */
  emitPlayerMovement() {
    if (
      this.character &&
      this.character.x !== undefined &&
      this.character.y !== undefined &&
      this.character.frame.name !== undefined
    ) {
      // 캐릭터의 현재 위치 및 프레임 인덱스를 받아옵니다.
      const currentPosition = {
        x: this.character?.x,
        y: this.character?.y,
        frame: this.character.frame.name,
      };

      // 이전 위치와 현재 위치를 비교합니다.
      if (
        this.character?.oldPosition &&
        (currentPosition.x !== this.character?.oldPosition.x ||
          currentPosition.y !== this.character?.oldPosition.y ||
          currentPosition.frame !== this.character?.frame.name)
      ) {
        // 위치가 바뀌었다면 서버에 전송합니다.
        console.log("emitPlayerMovement");
        this.socket?.emit("playerMovement", currentPosition);
      }

      // 현재 위치를 이전 위치로 저장합니다.
      this.character.oldPosition = currentPosition;
    }
  }
}
