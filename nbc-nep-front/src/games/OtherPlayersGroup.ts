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
      .sprite(playerInfo.x, playerInfo.y, "character", 0)
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
        }
      });
  }
}
