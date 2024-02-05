import styled from "styled-components";
import { ChatType } from "@/types/metaverse.types";
import { elasticPop } from "@/styles/animations";
import { StVideosLayoutContainer } from "@/components/video-conference/styles/shareScreenContainer.styles";

export const StMetaverseWrapper = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
`;

export const StMetaverseMain = styled.div`
  overflow: hidden;
`;

export const StGlobalNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 68px;
  justify-content: space-between;
  padding: 32px 12px 24px;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => theme.color.metaverse.primary};
  color: ${({ theme }) => theme.color.icon.interactive.primary};
  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const StHomeLink = styled.a`
  display: flex;

  font-size: 24px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.color.bg.primary};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius[16]};
`;

export const StBottomIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 287px;
  width: 44px;
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
`;

export const StCloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.border.primary};
  padding-top: ${({ theme }) => theme.spacing["24"]};
`;

export const StMetaverseChatBar = styled.div<{
  $isOpenChatSection: boolean;
  $chatType: ChatType;
}>`
  width: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "93px" : "0")};
  border-right: ${({ $isOpenChatSection }) =>
      $isOpenChatSection ? "1px" : "0"}
    solid rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;

  z-index: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "100" : "-1")};
  padding: ${({ theme }) => theme.spacing["16"]} 0;

  * {
    color: ${(props) =>
      props.$isOpenChatSection ? "white" : "rgba(0,0,0,0)"} !important;
  }
`;
export const StChatWrapperTitle = styled.div`
  font-weight: bold;
  color: #fff;
  padding-bottom: ${(props) => props.theme.spacing["20"]};
  margin-bottom: ${(props) => props.theme.spacing["8"]};
  width: 80%;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.color.border["sub-line"]};
  & > h1 {
    font-size: ${(props) => props.theme.unit["20"]};
    font-family: var(--point-font);
  }
`;

export const StChatButton = styled.button<{ $isActive: boolean }>`
  background: ${(props) =>
    props.$isActive ? props.theme.color.metaverse.secondary : "none"};
  color: ${(props) => props.theme.color.base.white};
  border: none;
  font-size: ${(props) => props.theme.unit["12"]};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  font-family: var(--main-font);
  padding: 0;
  width: 100%;
  border-radius: 0;
  padding: ${(props) => props.theme.spacing["8"]};
  &:hover {
    background: #111424;
  }
`;

export const StConfigModalWrapper = styled.div`
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

  animation: ${elasticPop} 0.25s ease-out;
`;

export const StConfigHeader = styled.header`
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
    width: ${(props) => props.theme.unit[20]};
    height: ${(props) => props.theme.unit[20]};
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

export const StMetaverseScrumBoardWrapper = styled(StVideosLayoutContainer)`
  color: black;
  justify-content: center;
  z-index: 2000;
  > div {
    width: 100% !important;
  }
  > div > div {
    max-width: 2000px;
    padding: 20px;
  }
`;

export const StChatInput = styled.input`
  width: 100%;
  height: 30px;
  outline: none;
  padding: 0 10px;
  background-color: #1f2542;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

export const StMetaverseDmHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing["16"]};
  > h1 {
    font-size: ${(props) => props.theme.unit["20"]};
    font-family: var(--point-font);
    font-weight: bold;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    white-space: nowrap;
  }
  > h2 {
    margin-top: ${(props) => props.theme.spacing["24"]};
    font-size: ${(props) => props.theme.unit["16"]};
    font-family: var(--main-font);
    font-weight: bold;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    white-space: nowrap;
    padding-bottom: ${(props) => props.theme.spacing["12"]};
    border-bottom: 1px solid white;
  }
  > button {
    position: absolute;
    right: 0;
    top: 0;
    width: 12px !important;
    height: 12px !important;
    background-color: transparent;
    border: none;
    padding: unset;
  }
`;

export const StMetaverseChatList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 10;
  height: 95%;

  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;

  > div:last-child {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StMetaverseGlobalChatWrapper = styled.div<{
  $isOpenChat: boolean;
}>`
  width: ${({ $isOpenChat }) => ($isOpenChat ? "260px" : "0")};
  overflow: hidden; // width가 0일 때 내부 내용이 보이지 않도록 설정
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  padding: ${({ theme, $isOpenChat }) =>
    `${$isOpenChat ? theme.spacing["16"] : "0"} ${$isOpenChat ? theme.spacing["12"] : "0"}`};

  * {
    color: ${(props) =>
      props.$isOpenChat ? "white" : "rgba(0,0,0,0)"} !important;
  }

  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    padding 0.2s ease;

  word-break: keep-all;

  z-index: ${({ $isOpenChat }) => ($isOpenChat ? "100" : "-1")};
`;

export const StChatContainer = styled.section<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "100%" : "0px")};
  height: ${(props) => (props.$isOpen ? "100%" : "0px")};
  overflow: hidden;
`;

export const StMessageWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["12"]};
  overflow-y: scroll;
  font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
  font-family: ${({ theme }) => theme.body.sm.regular.fontFamily};
  word-break: break-all;
  padding-top: ${(props) => props.theme.spacing[16]};
  padding-bottom: ${(props) => props.theme.spacing[16]};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StBadgeWrapper = styled.div`
  position: relative;
`;

export const StMetaversePlayerCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  > div > span {
    font-size: 14px;
    white-space: nowrap;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const StMetaversePlayerListWrapper = styled.div<{
  $isPlayerListOn: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "240px" : "0")};
  padding: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "10px" : "0")};
  overflow: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "scroll" : "hidden")};
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isPlayerListOn }) => ($isPlayerListOn ? "100" : "-1")};
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;
