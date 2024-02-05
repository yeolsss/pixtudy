import { useEffect, useRef } from "react";
import Phaser from "phaser";
import {
  GAME_FPS,
  GAME_GRAVITY,
  GAME_HEIGHT,
  GAME_WIDTH,
  VERTICAL_BORDER_OFFSET,
} from "@/components/metaverse/constants/constant";
import { SetupScene } from "@/components/metaverse/libs/setupScene";
import { SceneClass } from "@/components/metaverse/libs/sceneClass";
import { Game, Player, PlayerState } from "@/types/metaverse.types";
import PhaserSceneManager from "@/components/metaverse/libs/phaserSceneManager";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import usePlayerListStore from "@/zustand/metaversePlayerStore";
import useSocket from "@/hooks/socket/useSocket";

export default function useCreatePhaser() {
  const { spaceId, playerSpaceInfoData, id, displayName, setPlayerList } =
    useMetaversePlayer();
  const changePlayerState = usePlayerListStore.use.changePlayerState();

  const gameRef = useRef<Game | null>();
  const { socket, connect } = useSocket({ namespace: "/metaverse" });

  useEffect(() => {}, []);
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
        nickname: playerSpaceInfoData?.space_display_name || displayName,
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
}
