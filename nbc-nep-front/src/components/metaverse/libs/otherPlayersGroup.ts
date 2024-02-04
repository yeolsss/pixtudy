import { CurrentPlayer } from '@/components/metaverse/libs/currentPlayer'
import Phaser from 'phaser'
import { Player } from '@/types/metaverse.types'

const PLAYER_NAME_DEPTH = 2000
const PLAYER_BODY_SIZE_X = 32
const PLAYER_BODY_SIZE_Y = 32
const PLAYER_BODY_OFFSET_X = 0
const PLAYER_BODY_OFFSET_Y = 25
const PLAYER_NAME_OFFSET = 30

export class OtherPlayersGroup {
  group: Phaser.Physics.Arcade.Group
  scene: Phaser.Scene
  private otherPlayerNames: Map<string, Phaser.GameObjects.Text>

  constructor(scene: Phaser.Scene) {
    this.group = scene.physics.add.group()
    this.scene = scene
    this.otherPlayerNames = new Map()
  }

  /**
   *
   * @param playerInfo - 추가할 플레이어의 정보
   * @description 각 플레이어는 socketId로 구분한다.
   * playerId가 더 안정적이지만, 현재 단계에서는 mock data가 겹치기 떄문에 socketId로 구분한다.
   * 아마도 나중에 바꿔야 할 것.
   */
  addPlayer(playerInfo: Player) {
    const otherPlayerName = this.scene.add
      .text(
        playerInfo.x,
        playerInfo.y - PLAYER_NAME_OFFSET,
        playerInfo.nickname,
        {
          fontFamily: 'PretendardVariable'
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(PLAYER_NAME_DEPTH)

    const otherPlayer = this.scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, playerInfo.character, 0)
      .setCollideWorldBounds(true) as CurrentPlayer

    otherPlayer.body?.setSize(PLAYER_BODY_SIZE_X, PLAYER_BODY_SIZE_Y)
    otherPlayer.body?.setOffset(PLAYER_BODY_OFFSET_X, PLAYER_BODY_OFFSET_Y)
    otherPlayer.playerId = playerInfo.playerId

    // otherPlayer 그룹에 새 플레이어를 추가한다.
    this.group.add(otherPlayer)

    // otherPlayerNames에 otherPlayerNames gameObject를 추가한다.
    this.otherPlayerNames.set(playerInfo.playerId, otherPlayerName)
  }

  /**
   *
   * @param playerId - 삭제할 플레이어의 socketId. 이 socketId를 가진 플레이어를 group에서 찾아 삭제한다.
   */
  removePlayer(playerId: string) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer
        const otherPlayerName = this.otherPlayerNames.get(playerId)

        if (playerId === otherPlayer.playerId && otherPlayerName) {
          otherPlayerName.destroy()
          otherPlayer.destroy()
          this.otherPlayerNames.delete(playerId)
        }
      })
  }

  /**
   *
   * @param playerInfo - 이동할 플레이어의 정보. 이 정보를 바탕으로 group에서 해당 플레이어를 찾아 위치를 업데이트한다.
   */
  movePlayer(playerInfo: Player) {
    this.group
      .getChildren()
      .forEach((gameObject: Phaser.GameObjects.GameObject) => {
        const otherPlayer = gameObject as CurrentPlayer
        const otherPlayerName = this.otherPlayerNames.get(playerInfo.playerId)
        if (playerInfo.playerId === otherPlayer.playerId && otherPlayerName) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y)
          otherPlayerName.setPosition(
            playerInfo.x,
            playerInfo.y - PLAYER_NAME_OFFSET
          )
          otherPlayer.setFrame(playerInfo.frame)
        }
      })
  }
}
