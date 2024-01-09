import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";

const GameComponent = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: "100%",
      height: "100%",
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
          width: 1280,
          height: 800,
        },
      },
      scene: [ScenesMain, CharacterScenes],
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-hame"></div>;
};
export default GameComponent;
