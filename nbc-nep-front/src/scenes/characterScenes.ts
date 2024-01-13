import { CurrentPlayer } from "@/metaverse/CurrentPlayer";
import { OtherPlayersGroup } from "@/metaverse/OtherPlayersGroup";
import { MapData, Player, Players } from "@/types/metaverse";
import Phaser from "phaser";
import io, { Socket } from "socket.io-client";

const RUN = 350;
const WORK = 250;

interface InitData {
  mapData: MapData;
}

type PlayerInfo = {};
/**
 * CharacterScenes 클래스는 Phaser.Scene을 확장해서 게임 캐릭터의 동작을 관리한다.
 */
export class CharacterScenes extends Phaser.Scene {
  character?: CurrentPlayer;
  characterName?: Phaser.GameObjects.Text;
  otherPlayers?: OtherPlayersGroup;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  runKey?: Phaser.Input.Keyboard.Key;
  lastDirection?: string;
  private socket?: Socket;
  isRunning: boolean = false;

  constructor() {
    super({ key: "CharacterScenes" });
  }

  create() {
    const map = this.make.tilemap({
      key: "basic_map",
      tileWidth: 32,
      tileHeight: 32,
    });
    const tileSet = map.addTilesetImage("tile1", "tiles");
    const tileLayer = map.createLayer("tileLayer", tileSet!, 0, 0);
    const objLayer = map.createLayer("objectLayer", tileSet!, 0, 0);
    objLayer?.setCollisionByProperty({ collides: true });

    const playerInfo = this.game.registry.get("player");
    // socket setting
    this.otherPlayers = new OtherPlayersGroup(this);
    this.socket = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/metaverse`);

    this.socket.on("connect", () => {
      this.socket?.emit("userData", playerInfo);
    });

    // current player setting
    this.socket.on("currentPlayers", (players: Players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].socketId === this.socket?.id) {
          this.addPlayer(players[id], objLayer!);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });
    });

    this.socket.on("newPlayer", (playerInfo: Player) => {
      this.addOtherPlayers(playerInfo);
    });

    this.socket.on("playerDisconnected", (playerId: string) => {
      this.otherPlayers?.removePlayer(playerId);
    });

    this.socket.on("metaversePlayerList", (players: Players) => {
      const event = new CustomEvent("metaversePlayerList", {
        detail: players,
      });
      window.dispatchEvent(event);
    });
    this.createAnimations(playerInfo.character);

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.runKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.socket.on("playerMoved", (playerInfo: Player) => {
      this.otherPlayers?.movePlayer(playerInfo);
    });
  }

  /**
   * 게임의 상태를 업데이트한다. Phaser 게임 루프에서 자동으로 호출된다.
   * playerMovement 이벤트를 서버로 전송한다.
   */

  update() {
    if (this.runKey && Phaser.Input.Keyboard.JustDown(this.runKey)) {
      this.isRunning = !this.isRunning;
    }
    // 이동 벡터를 초기화하고 animationKey 값을 설정한다.
    const velocity = this.getMovementVector();
    this.updateCharacterMovement(velocity);
    this.updateLastDirection();
    let animationKey = this.lastDirection; // 마지막 방향을 기본값으로 설정한다.

    if (this.isAnyCursorKeyDown()) {
      // 이동 중인 경우 이동 방향에 맞는 애니메이션을 재생한다.
      if (animationKey) {
        this.character?.anims.getFrameName();
        this.character?.anims.play(animationKey, true);
      }
    } else {
      // 이동 입력이 없는 경우 멈춘 상태의 프레임을 설정한다.
      this.character?.anims.stop();
      let frameIndex = this.getFrameIndex(this.lastDirection ?? "down");
      this.character?.setFrame(frameIndex);
    }

    if (this.character && this.characterName) {
      // Update the position of characterName to be above the character
      this.characterName.setPosition(
        this.character.x,
        this.character.y - this.character.displayHeight / 2
      );
    }
    this.emitPlayerMovement();
  }

  /**
   * 캐릭터를 게임에 추가한다.
   * @param {Player} playerInfo - 플레이어 정보.
   * @param {Phaser.Tilemaps.TilemapLayer} objLayer - 충돌을 처리할 타일맵 레이어.
   */
  addPlayer(playerInfo: Player, objLayer: Phaser.Tilemaps.TilemapLayer) {
    this.characterName = this.add
      .text(playerInfo.x, playerInfo.y, playerInfo.nickname, {
        fontFamily: "PretendardVariable",
      }) // 플레이어 이름 표시할 오브젝트 생성
      .setOrigin(0.5, 0.5);
    this.character = this.physics.add
      .sprite(playerInfo.x, playerInfo.y, playerInfo.character, 0)
      .setDepth(1000);

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
    // db정보 호출.
    this.otherPlayers?.addPlayer(playerInfo);
  }

  /**
   * 각 캐릭터별로 애니메이션을 추가한다.
   */
  createAnimations(spriteKey: string) {
    const animations = [
      { key: "left", start: 4, end: 5 },
      { key: "right", start: 10, end: 11 },
      { key: "up", start: 7, end: 8 },
      { key: "down", start: 1, end: 2 },
    ];
    animations.forEach(({ key, start, end }) => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(spriteKey, {
          start,
          end,
        }),
        frameRate: 5,
        repeat: -1,
      });
    });
  }

  /**
   *
   * @returns {number} 커서 입력에 따라 변경된 x축, y축의 변화를 반환한다.
   */
  getMovementVector() {
    let velocity = new Phaser.Math.Vector2();

    if (this.cursors?.left.isDown) {
      velocity.x = -1;
    } else if (this.cursors?.right.isDown) {
      velocity.x = 1;
    }

    if (this.cursors?.up.isDown) {
      velocity.y = -1;
    } else if (this.cursors?.down.isDown) {
      velocity.y = 1;
    }

    velocity.normalize();
    return velocity;
  }

  /**
   *
   * @param {number} velocity 현재 캐릭터의 속도.
   */
  updateCharacterMovement(velocity: Phaser.Math.Vector2) {
    const characterSpeed = this.isRunning ? RUN : WORK;

    if (this.character && this.character.body) {
      this.character.setVelocity(
        velocity.x * characterSpeed,
        velocity.y * characterSpeed
      );
    }
  }

  updateLastDirection() {
    if (this.cursors?.left.isDown) {
      this.lastDirection = "left";
    } else if (this.cursors?.right.isDown) {
      this.lastDirection = "right";
    } else if (
      this.cursors?.up.isDown &&
      !this.cursors?.left.isDown &&
      !this.cursors?.right.isDown
    ) {
      this.lastDirection = "up";
    } else if (
      this.cursors?.down.isDown &&
      !this.cursors?.left.isDown &&
      !this.cursors?.right.isDown
    ) {
      this.lastDirection = "down";
    }
  }

  /**
   *
   * @returns {boolean} 방향키중에 어떤 키가 눌렸는지 여부를 반환한다.
   */
  isAnyCursorKeyDown() {
    return (
      this.cursors?.left.isDown ||
      this.cursors?.right.isDown ||
      this.cursors?.up.isDown ||
      this.cursors?.down.isDown
    );
  }

  /**
   *
   * @param {string} lastDirection
   * @returns {number} 마지막에 입력한 방향키에 맞는 frame을 반환한다.
   */
  getFrameIndex(lastDirection: string) {
    switch (lastDirection) {
      case "left":
        return 3;
      case "right":
        return 9;
      case "up":
        return 6;
      case "down":
        return 0;
      default:
        return 0; // 기본값으로 하방향 설정
    }
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
      // this.character.anims.getFrameName() 도 긴 한데... 어느게 맞을지..
      // 캐릭터의 현재 위치 및 프레임 인덱스를 받아옵니다.
      const currentPosition = {
        x: this.character?.x,
        y: this.character?.y,
        frame: this.character.frame.name,
        // 유저정보를 받아다가 여따 박아넣으면 되지않을까
      };

      // 이전 위치와 현재 위치를 비교합니다.
      if (
        this.character?.oldPosition &&
        (currentPosition.x !== this.character?.oldPosition.x ||
          currentPosition.y !== this.character?.oldPosition.y ||
          currentPosition.frame !== this.character?.frame.name)
      ) {
        // 위치가 바뀌었다면 서버에 전송합니다. 및 context에 전달
        const event = new CustomEvent("playerMovement", {
          detail: currentPosition,
        });
        window.dispatchEvent(event);
        this.socket?.emit("playerMovement", currentPosition);
      }

      // 현재 위치를 이전 위치로 저장합니다.
      this.character.oldPosition = currentPosition;
    }
  }
}
