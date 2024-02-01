import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import PhaserSceneManager from "@/components/metaverse/libs/phaserSceneManager";
import { SceneClass } from "@/components/metaverse/libs/sceneClass";
import { SetupScene } from "@/components/metaverse/libs/setupScene";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import MetaverseScrumBoard from "@/components/metaverse/metaverseScrumBaord/MetaverseScrumBoard";
import useConfirm from "@/hooks/confirm/useConfirm";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useSocket from "@/hooks/socket/useSocket";
import usePlayerList from "@/zustand/metaversePlayerStore";
import useMetaverseScrumIsOpen from "@/zustand/metaverseScrumIsOpenStore";
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
import { Game, Player, PlayerState } from "./types/metaverse";

const MetaverseComponent = () => {
  const { isOpen } = useConfirm();
  const { spaceId, playerSpaceInfoData, id, display_name, setPlayerList } =
    useMetaversePlayer();
  const changePlayerState = usePlayerList((state) => state.changePlayerState);
  const { isOpen: IsScrumOpen } = useMetaverseScrumIsOpen();
  const gameRef = useRef<Game | null>();
  const { socket, connect } = useSocket({ namespace: "/metaverse" });

  useEffect(() => {
    if (playerSpaceInfoData?.space_avatar) {
      connect();

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
        scene: [SetupScene, new SceneClass(socket, id)],
      };

      gameRef.current = new Phaser.Game(config);

      gameRef.current.registry.set("player", {
        playerId: id,
        nickname: playerSpaceInfoData?.space_display_name || display_name,
        character: playerSpaceInfoData?.space_avatar || "pinkybonz",
        spaceId,
        state: PlayerState.ONLINE,
      });

      PhaserSceneManager.setGameInstance(gameRef.current);
    }
    // 스페이스 별로 인원 받는거 대시보드에서 fetch

    const handlePlayerList = (players: Player[]) => {
      setPlayerList(players);
    };

    const handleChangePlyerState = (player: Player) => {
      changePlayerState(player.playerId, player.state);
    };

    socket.on("current-players", handlePlayerList);

    socket.on("metaverse-players", handlePlayerList);

    socket.on("change-player-state", handleChangePlyerState);

    return () => {
      // gameRef.current?.destroy(true);
      socket.off("current-players", handlePlayerList);

      socket.off("metaverse-players", handlePlayerList);

      socket.off("change-player-state", handleChangePlyerState);
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
