export default class PhaserSceneManager {
  private static gameInstance: Phaser.Game | null = null;

  public static setGameInstance(instance: Phaser.Game): void {
    PhaserSceneManager.gameInstance = instance;
  }

  public static disableInput(): void {
    if (
      PhaserSceneManager.gameInstance &&
      PhaserSceneManager.gameInstance.input.keyboard
    ) {
      PhaserSceneManager.gameInstance.input.keyboard.enabled = false;
    }
  }

  public static enableInput(): void {
    if (
      PhaserSceneManager.gameInstance &&
      PhaserSceneManager.gameInstance.input.keyboard
    ) {
      PhaserSceneManager.gameInstance.input.keyboard.enabled = true;
    }
  }
}
