export class CurrentPlayer extends Phaser.Physics.Arcade.Sprite {
  oldPosition?: { x: number; y: number };
  playerId?: string;
  movingLeft?: boolean;
  movingRight?: boolean;
  movingUp?: boolean;
  movingDown?: boolean;
  lastDirection?: string;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
    movingLeft: boolean = false,
    movingRight: boolean = false,
    movingUp: boolean = false,
    movingDown: boolean = false,
    lastDirection: string = ""
  ) {
    super(scene, x, y, texture, frame);
    this.oldPosition = { x: x, y: y };
    this.movingLeft = movingLeft;
    this.movingRight = movingRight;
    this.movingUp = movingUp;
    this.movingDown = movingDown;
    this.lastDirection = lastDirection;
  }
}
