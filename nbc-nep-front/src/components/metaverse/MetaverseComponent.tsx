import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";
import styled from "styled-components";
import MetaverseChat from "./metaverseChat/MetaverseChat";
import { useAppSelector } from "@/hooks/useReduxTK";

const MetaverseComponent = () => {
  const { display_name, id } = useAppSelector((state) => state.authSlice.user);
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

    // 플레이어 정보를 저장하는 registry
    // 임의로 설정해 둔 정보로, 실제 유저 정보를 가져와야 한다
    game.registry.set("player", {
      playerId: id,
      nickname: display_name,
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
