import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import PhaserSceneManager from "@/components/metaverse/libs/phaserSceneManager";
import { SceneClass } from "@/components/metaverse/libs/sceneClass";
import { SetupScene } from "@/components/metaverse/libs/setupScene";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { MetaverseChatProvider } from "@/context/MetaverseChatProvider";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import Phaser from "phaser";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import VideoConference from "../video-conference/VideoConference";
import {
  GAME_FPS,
  GAME_GRAVITY,
  GAME_HEIGHT,
  GAME_WIDTH,
  VERTICAL_BORDER_OFFSET,
} from "./constants/constant";
import { Game } from "./types/metaverse";

const MetaverseComponent = () => {
  const { spaceId, playerSpaceInfoData, id, display_name } = usePlayerContext();

  const gameRef = useRef<Game | null>();

  useEffect(() => {
    const resize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(
          window.innerWidth,
          window.innerHeight - VERTICAL_BORDER_OFFSET
        );
      }
    };

    if (playerSpaceInfoData?.space_avatar) {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight - VERTICAL_BORDER_OFFSET,
        parent: "phaser-metaverse",
        physics: {
          default: "arcade",
          arcade: {
            gravity: GAME_GRAVITY,
            debug: false,
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            fps: GAME_FPS,
          },
        },
        scene: [SetupScene, SceneClass],
      };

      gameRef.current = new Phaser.Game(config);

      // 플레이어 정보를 저장하는 registry
      // 임의로 설정해 둔 정보로, 실제 유저 정보를 가져와야 한다
      gameRef.current.registry.set("player", {
        playerId: id,
        nickname: playerSpaceInfoData?.space_display_name || display_name,
        character: playerSpaceInfoData?.space_avatar || "pinkybonz",
        spaceId,
      });

      PhaserSceneManager.setGameInstance(gameRef.current);

      window.addEventListener("resize", resize);
    }

    return () => {
      gameRef.current?.destroy(true);
      window.removeEventListener("resize", resize);
    };
  }, [playerSpaceInfoData]);

  return (
    <StMetaverseWrapper>
      <GlobalNavBar />
      <MetaverseChatProvider>
        <MetaverseChatBar />
      </MetaverseChatProvider>
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
