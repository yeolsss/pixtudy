import { CurrentPlayer } from "@/metaverse/CurrentPlayer";
import { Player } from "@/types/metaverse";
import Phaser from "phaser";

export class OtherPlayersGroup {
  group: Phaser.Physics.Arcade.Group;
  scene: Phaser.Scene;
  private otherPlayerNames: Map<string, Phaser.GameObjects.Text>;

  constructor(scene: Phaser.Scene) {
    this.group = scene.physics.add.group();
    this.scene = scene;
    this.otherPlayerNames = new Map();
  }

  addPlayer(playerInfo: Player) {
    const otherPlayerName = this.scene.add
      .text(playerInfo.x, playerInfo.y - 30, playerInfo.nickname, {
        fontFamily: "PretendardVariable",
      })
      .setOrigin(0.5, 0.5);
    const otherPlayer = this.scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, playerInfo.character, 0)
      .setCollideWorldBounds(true) as CurrentPlayer;
    otherPlayer.body?.setSize(32, 32);
    otherPlayer.body?.setOffset(0, 25);
    otherPlayer.playerId = playerInfo.playerId;
    this.group.add(otherPlayer);
    this.otherPlayerNames.set(playerInfo.playerId, otherPlayerName);
  }

  removePlayer(playerId: string) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer;
        const otherPlayerName = this.otherPlayerNames.get(playerId);
        if (playerId === otherPlayer.playerId && otherPlayerName) {
          otherPlayer.destroy();
          otherPlayerName.destroy();
          this.otherPlayerNames.delete(playerId);
        }
      });
  }

  movePlayer(playerInfo: Player) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer;
        const otherPlayerName = this.otherPlayerNames.get(playerInfo.playerId);
        if (playerInfo.playerId === otherPlayer.playerId && otherPlayerName) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          otherPlayerName.setPosition(playerInfo.x, playerInfo.y - 30);
          otherPlayer.setFrame(playerInfo.frame);
        }
      });
  }
}
