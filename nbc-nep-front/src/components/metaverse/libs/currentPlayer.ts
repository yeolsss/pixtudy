export class CurrentPlayer extends Phaser.Physics.Arcade.Sprite {
  oldPosition?: { x: number; y: number; frame: string }
  playerId?: string
  socketId?: string
  nickname?: string
  character?: string

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame)
    this.oldPosition = { x: x, y: y, frame: frame }
  }
}
