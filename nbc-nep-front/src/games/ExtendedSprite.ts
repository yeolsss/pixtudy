export class ExtendedSprite extends Phaser.Physics.Arcade.Sprite {
  oldPosition?: { x: number; y: number };

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
