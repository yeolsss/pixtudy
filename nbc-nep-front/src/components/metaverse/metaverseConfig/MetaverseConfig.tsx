import ModalPortal from "@/components/modal/ModalPortal";
import useModal from "@/hooks/modal/useModal";
import { useState } from "react";
import styled from "styled-components";
import {
  CHAT_CONFIG,
  SPACE_CONFIG,
  VIDEO_CONFIG,
} from "../constants/config.constant";
import { Config } from "../types/config.types";
import ConfigAside from "./ConfigAside";
import ConfigSpace from "./ConfigSpace";
import ConfigSpaceChat from "./ConfigSpaceChat";
import ConfigVideo from "./ConfigVideo";

export default function MetaverseConfigModal() {
  const [currentConfigMode, setConfigMode] = useState<Config>(SPACE_CONFIG);

  const handleSelectConfigMode = (configMode: Config) => {
    setConfigMode(configMode);
  };

  const { isConfigModalOpen, closeModal } = useModal();

  return (
    <>
      {isConfigModalOpen && (
        <ModalPortal>
          <StConfigModalWrapper>
            <StConfigHeader>
              <h2>설정</h2>
              <button onClick={() => closeModal()}>close config modal</button>
            </StConfigHeader>

            <ConfigAside
              currentConfigMode={currentConfigMode}
              handleSelectConfigMode={handleSelectConfigMode}
            />
            {currentConfigMode === SPACE_CONFIG && <ConfigSpace />}
            {currentConfigMode === VIDEO_CONFIG && <ConfigVideo />}
            {currentConfigMode === CHAT_CONFIG && <ConfigSpaceChat />}
          </StConfigModalWrapper>
        </ModalPortal>
      )}
    </>
  );
}

const StConfigModalWrapper = styled.div`
  width: 720px;
  position: absolute;

  height: 500px;
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: white;

  margin: auto;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > * {
    padding: ${(props) => props.theme.spacing[24]};
  }

  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 150px auto;
  grid-template-areas:
    "header header"
    "aside main";
  overflow: hidden;
`;

const StConfigHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  grid-area: header;
  h2 {
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: 700;
    font-family: var(--default-font);
  }

  button {
    width: ${(props) => props.theme.unit[20]}px;
    height: ${(props) => props.theme.unit[20]}px;
    border: none;
    padding: 0;
    background: url("/assets/close.svg") no-repeat center;
    &:hover {
      background-color: transparent;
    }
    text-indent: -9999px;
  }
  border-bottom: 1px solid ${(props) => props.theme.color.bg.secondary};
`;
