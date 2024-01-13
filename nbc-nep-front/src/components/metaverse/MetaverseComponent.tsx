import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import { useEffect } from "react";
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
          fps: 60,
        },
      },
      scene: [ScenesMain, CharacterScenes],
    };

    game = new Phaser.Game(config);
    game.registry.set("player", {
      playerId: "yongseung",
      nickname: "스123님",
      character: "pinkybonz",
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
