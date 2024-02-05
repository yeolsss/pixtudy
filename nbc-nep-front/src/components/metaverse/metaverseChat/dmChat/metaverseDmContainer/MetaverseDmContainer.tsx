import { useState } from "react";

import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import MetaverseDmForm from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmForm";
import useDmChannel from "@/hooks/dm/useDmChannel";
import useDmMessage from "@/hooks/dm/useDmMessage";
import useEndOfChat from "@/hooks/metaverse/useEndOfChat";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { Tables } from "@/types/supabase.types";
import useAuthStore from "@/zustand/authStore";
import useDmStore from "@/zustand/dmStore";

import { StMessageWrapper } from "@/components/metaverse/styles/metaverse.styles";
import { StMetaverseDmChannel } from "@/components/metaverse/styles/metaverseDm.styles";
import MetaverseChatCard from "../../metaverseChatBar/MetaverseChatCard";

export default function MetaverseDmContainer() {
  const otherUserId = useDmStore.use.otherUserId();
  const otherUserName = useDmStore.use.otherUserName();
  // 현재 세션의 유저정보
  const sessionUser = useAuthStore.use.user();
  const { findPlayerById } = useMetaversePlayer();
  const currentPlayer = findPlayerById(sessionUser.id);
  const currentUser = { ...sessionUser };
  if (sessionUser && currentPlayer) {
    currentUser.displayName = currentPlayer.nickname || sessionUser.displayName;
  }

  const otherUserInfo: Partial<Tables<"users">> = {
    id: otherUserId,
    displayName: otherUserName,
  };

  // 메시지 정보를 저장하는 state
  const [messages, setMessages] = useState<getDmChannelMessagesReturns[]>([]);
  // 상대방 유저 정보
  // dm 채널 정보 custom hook
  const { connectChannel, currentDmChannel } = useDmChannel({
    otherUserInfo,
    setMessages,
    currentUser,
  });

  const endOfChatRef = useEndOfChat([messages]);

  // dm message 정보 custom hook
  useDmMessage({ currentDmChannel, setMessages });

  return (
    <>
      <StMetaverseDmChannel>
        <StMessageWrapper>
          {messages?.map((message) => (
            <MetaverseChatCard message={message} key={message.id} type="DM" />
          ))}
          <div ref={endOfChatRef} />
        </StMessageWrapper>
      </StMetaverseDmChannel>
      <MetaverseDmForm
        currentDmChannel={currentDmChannel}
        setMessages={setMessages}
        otherUserInfo={otherUserInfo}
        connectChannel={connectChannel}
        currentUser={currentUser}
      />
    </>
  );
}
