import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import { MetaversePlayerProvider } from "@/context/MetaversePlayerProvider";
import { CharacterScenes } from "@/scenes/characterScenes";
import { ScenesMain } from "@/scenes/scenesMain";
import Phaser from "phaser";
import { useEffect } from "react";
import styled from "styled-components";

// 시나리오
// 1. useQuery 사용해서 유저 정보를 가져온다.
// 2. 가져온 유저 정보를 바탕으로 space에 입장한다.
// 2-1. 유저 정보 중 space_display_name 이 없다면, nickname을 입력받는다.
// 2-2. 유저 정보 중 space_avatar 가 없다면 프리셋 중 하나를 선택한다.
// 2-3. 2-1, 2-2 는 모달 창에서 진행한다.

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

    // 플레이어 정보를 저장하는 registry
    // 임의로 설정해 둔 정보로, 실제 유저 정보를 가져와야 한다
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
        {/* <MetaverseChat /> */}
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
