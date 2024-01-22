import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";
import { ChatType } from "@/components/metaverse/types/ChatType";

export default function MetaverseChatBar() {
  const isOpenChatSection = useAppSelector(
    (state) => state.globalNavBar.chatSection
  );
  const { isOpenChat, chatType } = useAppSelector((state) => state.chatType);
  const dispatch = useAppDispatch();

  const handleChatTypeOpen = (type: ChatType) => {
    let updateChatType = {
      isOpenChat,
      chatType: type,
    };

    dispatch(setIsOpenChat(updateChatType));
  };

  return (
    <>
      <StMetaverseChatBar $isOpenChatSection={isOpenChatSection}>
        <StChatWrapperTitle>
          <h1>chat</h1>
        </StChatWrapperTitle>
        <button onClick={() => handleChatTypeOpen("GLOBAL")}>Room</button>
        <button onClick={() => handleChatTypeOpen("DM")}>DM</button>
      </StMetaverseChatBar>
      <MetaverseChat />
    </>
  );
}

const StMetaverseChatBar = styled.div<{ $isOpenChatSection: boolean }>`
  width: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "93px" : "0")};
  border-right: ${({ $isOpenChatSection }) =>
      $isOpenChatSection ? "1px" : "0"}
    solid rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: #1f2542;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenChatSection }) => ($isOpenChatSection ? "100" : "-1")};
  padding: ${({ theme }) => theme.spacing["16"]} 0;
  // ${({ $isOpenChatSection }) => ($isOpenChatSection ? "24px" : "0")};
  > button {
    width: 100%;
  }
`;
const StChatWrapperTitle = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: var(--sub-font);
  color: #fff;
`;
