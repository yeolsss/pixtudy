import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import { useGetOtherUserInfo } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isCloseDm } from "@/redux/modules/dmSlice";
import useDmChannel from "@/hooks/dm/useDmChannel";
import useDmMessage from "@/hooks/dm/useDmMessage";
import MetaverseDmForm from "@/components/metaverse/metaverseChat/dmChat/metaverseDmContainer/MetaverseDmForm";

export default function MetaverseDmContainer() {
  const { otherUserId } = useAppSelector((state) => state.dm);
  const dispatch = useAppDispatch();

  // 메시지 정보를 저장하는 state
  const [messages, setMessages] = useState<getDmChannelMessagesReturns[]>([]);
  // 상대방 유저 정보
  const otherUserInfo = useGetOtherUserInfo(otherUserId);

  // dm 채널 정보 custom hook
  const { connectChannel, currentDmChannel } = useDmChannel({
    otherUserInfo,
    setMessages,
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

  const handleCloseDmContainer = () => {
    dispatch(isCloseDm());
  };

  return (
    <StMetaverseDmChannel>
      <button onClick={handleCloseDmContainer}>close</button>
      <StMessageWrapper ref={messageListRef}>
        {messages?.map((message) => (
          <StMessageCard key={message.id}>
            <h3>{message.sender?.display_name}</h3>
            <span>{message.message}</span>
            <span>{message.created_at}</span>
          </StMessageCard>
        ))}
      </StMessageWrapper>
      <MetaverseDmForm
        currentDmChannel={currentDmChannel}
        setMessages={setMessages}
        otherUserInfo={otherUserInfo}
        connectChannel={connectChannel}
      />
    </StMetaverseDmChannel>
  );
}

const StMetaverseDmChannel = styled.div`
  max-height: 100%;
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
  max-height: 80%;
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
