import { useState } from "react";
import styled from "styled-components";
import { SPACE_CONFIG, VIDEO_CONFIG } from "../constants/config.contant";
import { Config } from "../types/config.types";
import ConfigAside from "./ConfigAside";
import ConfigVideo from "./ConfigVideo";
import ConfigSpace from "./ConfingSpace";

export default function MetaverseConfigModal() {
  const [currentConfigMode, setConfigMode] = useState<Config>(SPACE_CONFIG);

  const handleSelectConfigMode = (configMode: Config) => {
    setConfigMode(configMode);
  };

  return (
    <StTestDiv>
      <ConfigAside
        currentConfigMode={currentConfigMode}
        handleSelectConfigMode={handleSelectConfigMode}
      />
      {currentConfigMode === SPACE_CONFIG && <ConfigSpace />}
      {currentConfigMode === VIDEO_CONFIG && <ConfigVideo />}
    </StTestDiv>
  );
}
// TODO: owner만 -> 스페이스 삭제, 스페이스 이름 변경, 스페이스 설명 수정이 가능해야 한다, 썸네일 수정 및 삭제도 가능해야 한다
// TODO: (그 외) 마이크, 비디오를 설정할 수 있는 창
// TODO: (그 외) 스페이스 정보를 확인할 수 있다.

// 그러면 내가 필요한 데이터는 스페이스 정보와, 현재 사용자 정보를 불러와야 한다. (마이크, 비디오 설정할 수 : 후순위 )있어야 하고
// owner도 스페이스 정보를 확인할 수 있다.
// 그러면 디자인을 하나의 왼쪽 사이드로 오른쪽은 어떻게 저렇게 해야겠네

const StTestDiv = styled.div`
  width: 250px;
  position: absolute;
  top: 0;
  left: 150px;
  height: 300px;
  background-color: white;
`;
