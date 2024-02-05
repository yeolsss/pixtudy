import MetaverseChat from "@/components/metaverse/metaverseChat/MetaverseChat";
import useChatTypeStore from "@/zustand/chatTypeStore";
import useGlobalNavBarStore from "@/zustand/globalNavBarStore";
import { ChatType } from "@/types/metaverse.types";
import {
  StChatButton,
  StChatWrapperTitle,
  StMetaverseChatBar,
} from "@/components/metaverse/styles/metaverse.styles";

export default function MetaverseChatBar() {
  const isChatSectionOn = useGlobalNavBarStore.use.isChatSectionOn();
  const openChat = useChatTypeStore.use.openChat();
  const chatType = useChatTypeStore.use.chatType();

  const handleChatTypeOpen = (newChatType: ChatType) => {
    openChat(newChatType);
  };

  return (
    <>
      <StMetaverseChatBar
        $isOpenChatSection={isChatSectionOn}
        $chatType={chatType}
      >
        <StChatWrapperTitle>
          <h1>Chat</h1>
        </StChatWrapperTitle>
        <StChatButton
          onClick={() => handleChatTypeOpen("GLOBAL")}
          $isActive={chatType === "GLOBAL"}
        >
          Space
        </StChatButton>
        <StChatButton
          onClick={() => handleChatTypeOpen("DM")}
          $isActive={chatType === "DM"}
        >
          DM
        </StChatButton>
      </StMetaverseChatBar>
      <MetaverseChat />
    </>
  );
}
