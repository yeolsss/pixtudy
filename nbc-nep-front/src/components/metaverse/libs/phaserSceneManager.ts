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
      console.log(
        "disabled",
        PhaserSceneManager.gameInstance.input.keyboard.enabled
      );
    }
  }

  public static enableInput(): void {
    if (
      PhaserSceneManager.gameInstance &&
      PhaserSceneManager.gameInstance.input.keyboard
    ) {
      PhaserSceneManager.gameInstance.input.keyboard.enabled = true;
      console.log(
        "enable",
        PhaserSceneManager.gameInstance.input.keyboard.enabled
      );
    }
  }
}
