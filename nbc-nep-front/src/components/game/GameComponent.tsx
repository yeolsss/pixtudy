import { useEffect } from "react";
import { PhaserConfig } from "@/config/phaserConfig";

const GameComponent = () => {
  useEffect(() => {
    import("phaser").then((Phaser) => {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "phaser-game",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: PhaserConfig,
      };
      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
      };
    });
  }, []);

  return <div id="phaser-hame"></div>;
};
export default GameComponent;
