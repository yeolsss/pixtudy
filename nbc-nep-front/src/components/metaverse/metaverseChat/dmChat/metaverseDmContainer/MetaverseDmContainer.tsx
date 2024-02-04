import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import MetaverseDmForm from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmForm";
import useDmChannel from "@/hooks/dm/useDmChannel";
import useDmMessage from "@/hooks/dm/useDmMessage";
import useEndOfChat from "@/hooks/metaverse/useEndOfChat";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { Tables } from "@/supabase/types/supabase";
import useAuthStore from "@/zustand/authStore";
import useDmStore from "@/zustand/dmStore";
import { useState } from "react";
import styled from "styled-components";
import MetaverseChatCard from "../../metaverseChatBar/MetaverseChatCard";

export default function MetaverseDmContainer() {
  const otherUserId = useDmStore.use.otherUserId();
  const otherUserName = useDmStore.use.otherUserName();
  // 현재 세션의 유저정보
  const sessionUser = useAuthStore.use.user();
  const { findPlayerById } = useMetaversePlayer();
  const currentPlayer = findPlayerById(sessionUser.id);
  let currentUser = { ...sessionUser };
  if (sessionUser && currentPlayer) {
    currentUser.display_name =
      currentPlayer.nickname || sessionUser.display_name;
  }

  const otherUserInfo: Partial<Tables<"users">> = {
    id: otherUserId,
    display_name: otherUserName,
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
          <div ref={endOfChatRef}></div>
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

const StMetaverseDmChannel = styled.div`
  height: 85%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4"]};
  overflow: hidden;
`;

const StMessageWrapper = styled.ul`
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
