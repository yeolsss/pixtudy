import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import MetaverseDmForm from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmForm";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import useDmChannel from "@/hooks/dm/useDmChannel";
import useDmMessage from "@/hooks/dm/useDmMessage";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Tables } from "@/supabase/types/supabase";
import useAuth from "@/zustand/authStore";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function MetaverseDmContainer() {
  const { otherUserId, spaceId, otherUserName, otherUserAvatar } =
    useAppSelector((state) => state.dm);

  // 현재 세션의 유저정보
  const { user: sessionUser } = useAuth();
  const { findPlayerById } = usePlayerContext();
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

  // dm message 정보 custom hook
  useDmMessage({ currentDmChannel, setMessages });

  // message ul ref (스크롤)
  const messageListRef = useRef<HTMLUListElement>(null);

  // 스크롤이 자동으로 맨 아래로 가도록
  useEffect(() => {
    if (messageListRef.current)
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <StMetaverseDmChannel>
      <StMessageWrapper ref={messageListRef}>
        {messages?.map((message) => (
          <StMessageCard key={message.id}>
            <h3>
              {message.sender_display_name || message.receiver_display_name}
            </h3>
            <span>{message.message}</span>
            {/*<span>{message.created_at}</span>*/}
          </StMessageCard>
        ))}
      </StMessageWrapper>
      <MetaverseDmForm
        currentDmChannel={currentDmChannel}
        setMessages={setMessages}
        otherUserInfo={otherUserInfo}
        connectChannel={connectChannel}
        currentUser={currentUser}
      />
    </StMetaverseDmChannel>
  );
}

const StMetaverseDmChannel = styled.div`
  height: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4"]};
`;

const StMessageWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["12"]};
  overflow-y: scroll;
  min-height: 90%;
  max-height: 90%;
  font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
  font-family: ${({ theme }) => theme.body.sm.regular.fontFamily};
  word-break: break-all;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StMessageCard = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4"]};
`;
