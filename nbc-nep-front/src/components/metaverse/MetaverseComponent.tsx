import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";
import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import styled from "styled-components";
import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";

const MetaverseComponent = () => {
  useEffect(() => {
    let game: Phaser.Game | undefined;
    const resize = () => {
      if (game) {
        game.scale.resize(window.innerWidth, window.innerHeight - 2);
      }
    };

    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight - 2,
      parent: "phaser-metaverse",
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

    game = new Phaser.Game(config);
    game.registry.set("userId", {
      userId: "test",
      nickname: "송용승",
      character: "character2",
      position: { x: 0, y: 0 },
    });

    window.addEventListener("resize", resize);

    return () => {
      game?.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <MetaversePlayerProvider>
      <StMetaverseWrapper>
        <StMetaverseMain id="phaser-metaverse"></StMetaverseMain>
        <MetaverseChat />
        <MetaversePlayerList />
      </StMetaverseWrapper>
    </MetaversePlayerProvider>
  );
};

const StMetaverseWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;
const StMetaverseMain = styled.div`
  overflow: hidden;
`;
export default MetaverseComponent;