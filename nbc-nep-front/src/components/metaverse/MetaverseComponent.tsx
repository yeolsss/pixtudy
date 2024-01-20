import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { CharacterScenes } from "@/metaverse/scenes/characterScenes";
import { ScenesMain } from "@/metaverse/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";
import styled from "styled-components";
import VideoConference from "../video-conference/VideoConference";
import PhaserSceneManager from "@/metaverse/scenes/phaserSceneManager";

const MetaverseComponent = () => {
  const { spaceId, playerSpaceInfoData, id, display_name } = usePlayerContext();

  useEffect(() => {
    let game: Phaser.Game | undefined;
    const resize = () => {
      if (game) {
        game.scale.resize(window.innerWidth, window.innerHeight - 2);
      }
    };

    if (playerSpaceInfoData?.space_avatar) {
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
        nickname: playerSpaceInfoData?.space_display_name || display_name,
        character: playerSpaceInfoData?.space_avatar || "pinkybonz",
        spaceId,
      });

      PhaserSceneManager.setGameInstance(game);

      window.addEventListener("resize", resize);
    }

    return () => {
      game?.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, [playerSpaceInfoData]);

  return (
    <StMetaverseWrapper>
      <GlobalNavBar />
      <MetaverseChatBar />
      <MetaversePlayerList />
      <StMetaverseMain id="phaser-metaverse" />
      <VideoConference />
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
