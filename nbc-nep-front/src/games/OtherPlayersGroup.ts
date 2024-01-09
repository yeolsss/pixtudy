import { CurrentPlayer } from "@/games/CurrentPlayer";
import Phaser from "phaser";

export class OtherPlayersGroup {
  group: Phaser.Physics.Arcade.Group;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.group = scene.physics.add.group();
    this.scene = scene;
  }

  addPlayer(playerInfo: Player) {
    const otherPlayer = this.scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, "otherCharacter", 0)
      .setCollideWorldBounds(true) as CurrentPlayer;
    otherPlayer.body?.setSize(32, 32);
    otherPlayer.body?.setOffset(0, 25);
    otherPlayer.playerId = playerInfo.playerId;
    this.group.add(otherPlayer);
  }

  removePlayer(playerId: string) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer;
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
  }

  movePlayer(playerInfo: Player) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer;
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          otherPlayer.movingLeft = playerInfo.movingLeft;
          otherPlayer.movingRight = playerInfo.movingRight;
          otherPlayer.movingUp = playerInfo.movingUp;
          otherPlayer.movingDown = playerInfo.movingDown;
          otherPlayer.lastDirection = playerInfo.lastDirection;

          let animationKey = playerInfo.lastDirection; // 마지막 방향을 기본값으로 설정합니다.

          if (
            otherPlayer.movingLeft ||
            otherPlayer.movingRight ||
            otherPlayer.movingUp ||
            otherPlayer.movingDown
          ) {
            // 이동 중인 경우 이동 방향에 맞는 애니메이션을 재생합니다.
            if (animationKey) {
              otherPlayer?.anims.play(animationKey, true);
            }
          } else {
            // 이동 입력이 없는 경우 멈춘 상태의 프레임을 설정합니다.
            if (playerInfo.lastDirection) {
              otherPlayer?.anims.stop();

              let frameIndex;
              switch (playerInfo.lastDirection) {
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
              otherPlayer?.setFrame(frameIndex);
            }
          }
        }
      });
  }
}
