export class CurrentPlayer extends Phaser.Physics.Arcade.Sprite {
  oldPosition?: { x: number; y: number };
  playerId?: string;
  movingLeft?: boolean;
  movingRight?: boolean;
  movingUp?: boolean;
  movingDown?: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.oldPosition = { x: x, y: y };
  }
}
