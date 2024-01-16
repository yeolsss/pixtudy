import { CharacterScenes } from "@/scenes/characterScenes";
import { useAppSelector } from "@/hooks/useReduxTK";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";
import styled from "styled-components";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { useRouter } from "next/router";
import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";

const MetaverseComponent = () => {
  const { display_name, id } = useAppSelector((state) => state.authSlice.user);
  const { spaceId } = usePlayerContext();
  const router = useRouter();

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
          fps: 30,
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
      character: "ginger",
      spaceId,
    });

    window.addEventListener("resize", resize);

    router.beforePopState(() => {
      game?.destroy(true);
      window.removeEventListener("resize", resize);
      return true;
    });

    return () => {
      game?.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <StMetaverseWrapper>
      <GlobalNavBar />
      <MetaverseChatBar />
      <MetaversePlayerList />
      <StMetaverseMain id="phaser-metaverse"></StMetaverseMain>
    </StMetaverseWrapper>
  );
};

const StMetaverseWrapper = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
`;
const StMetaverseMain = styled.div`
  overflow: hidden;
`;
export default MetaverseComponent;
