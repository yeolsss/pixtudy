import MetaverseChat from "@/components/metaverseChat/MetaverseChat";
import { PlayerProvider } from "@/context/PlayerProvider";
import { useGetCurrentSpaceUsers } from "@/hooks/query/useSupabase";
import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import { Space_members } from "@/types/supabase.tables.type";
import Phaser from "phaser";
import { useEffect, useState } from "react";
import styled from "styled-components";

const space_id = "0f5f0efe-ccc9-49a7-bc12-224eaa19685b";

const MetaverseComponent = () => {
  const getCurrentUsers = useGetCurrentSpaceUsers();
  const [currentUsers, setCurrentUsers] = useState<Space_members[]>([]);

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
    <PlayerProvider>
      <StMetaverseWrapper>
        <StMetaverseMain id="phaser-metaverse"></StMetaverseMain>
        <MetaverseChat />
      </StMetaverseWrapper>
    </PlayerProvider>
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
