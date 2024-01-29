import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import PhaserSceneManager from "@/components/metaverse/libs/phaserSceneManager";
import { SceneClass } from "@/components/metaverse/libs/sceneClass";
import { SetupScene } from "@/components/metaverse/libs/setupScene";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import useConfirm from "@/hooks/confirm/useConfirm";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import Phaser from "phaser";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import ConfirmModal from "../modal/confirmModal/ConfirmModal";
import VideoConference from "../video-conference/VideoConference";
import {
  GAME_FPS,
  GAME_GRAVITY,
  GAME_HEIGHT,
  GAME_WIDTH,
  VERTICAL_BORDER_OFFSET,
} from "./constants/constant";
import MetaverseConfigModal from "./metaverseConfig/MetaverseConfig";
import { Game } from "./types/metaverse";
import MetaverseScrumBoard from "@/components/metaverse/metaverseScrumBaord/MetaverseScrumBoard";
import useMetaverseScrumIsOpen from "@/zustand/metaverseScrumIsOpenStore";

const MetaverseComponent = () => {
  const { isOpen } = useConfirm();
  const { spaceId, playerSpaceInfoData, id, display_name } =
    useMetaversePlayer();
  const { isOpen: IsScrumOpen } = useMetaverseScrumIsOpen();
  const gameRef = useRef<Game | null>();

  useEffect(() => {
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

      gameRef.current.registry.set("player", {
        playerId: id,
        nickname: playerSpaceInfoData?.space_display_name || display_name,
        character: playerSpaceInfoData?.space_avatar || "pinkybonz",
        spaceId,
      });

      PhaserSceneManager.setGameInstance(gameRef.current);
    }

    return () => {
      // gameRef.current?.destroy(true);
    };
  }, [playerSpaceInfoData]);

  useEffect(() => {
    const resize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(
          window.innerWidth,
          window.innerHeight - VERTICAL_BORDER_OFFSET
        );
      }
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <StMetaverseWrapper>
      <GlobalNavBar />
      <MetaverseChatBar />
      <MetaversePlayerList />
      <StMetaverseMain id="phaser-metaverse" />
      <VideoConference />
      <MetaverseConfigModal />
      {isOpen && <ConfirmModal />}
      {IsScrumOpen && <MetaverseScrumBoard />}
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
