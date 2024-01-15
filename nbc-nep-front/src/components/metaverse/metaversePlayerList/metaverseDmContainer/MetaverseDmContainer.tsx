import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import {
  useGetDmChannel,
  useGetDmMessages,
  useGetOtherUserInfo,
  useSendMessage,
} from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { Tables } from "@/types/supabase";
import {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface Props {
  otherUserId: string;
  handleCloseDmContainer: (id: string) => void;
  spaceId: string;
}

export default function MetaverseDmContainer({
  otherUserId,
  handleCloseDmContainer,
  spaceId,
}: Props) {
  const sendMessage = useSendMessage();

  // 상대방 유저와 활성화된 dm 채널 아이디
  // 채널이 이미 있을 때: string/ 없을 때: null
  const currentDmChannel = useGetDmChannel({
    receiverId: otherUserId,
    spaceId,
  });

  const queryClient = useQueryClient();

  // 상대방 유저와 기존 메시지 가져오기
  const prevDmMessages = useGetDmMessages(currentDmChannel!);

  // 상대방 유저 정보
  const otherUserInfo = useGetOtherUserInfo(otherUserId);

  // 메시지 정보를 저장하는 state
  const [messages, setMessages] = useState<getDmChannelMessagesReturns[]>([]);

  // 현재 구독중인 채널 정보
  const currentSubscribeChannel = useRef<RealtimeChannel | null>(null);

  // 현재 세션의 유저정보
  const currentUser = useAppSelector((state) => state.authSlice.user);

  // react-hook-form 초기화
  const { handleSubmit, register, reset } = useForm();

  // message ul ref (스크롤)
  const messageListRef = useRef<HTMLUListElement>(null);

  // 구독중인 채널에서 메시지를 인지하였을 떄 이벤트
  const newMessageInChannel = (
    payload: RealtimePostgresInsertPayload<Tables<"dm_messages">>
  ) => {
    const newMessage = {
      id: payload.new.id,
      created_at: payload.new.created_at,
      dm_id: payload.new.dm_id,
      message: payload.new.message,
      receiver:
        currentUser.id === payload.new.receiver_id
          ? currentUser
          : otherUserInfo!,
      sender:
        currentUser.id === payload.new.receiver_id
          ? otherUserInfo!
          : currentUser,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // 채널 id 정보를 통해 채널 구독을 시작하는 함수
  const connectChannel = (currentChannelId: string) => {
    const channel = supabase.channel(`dm_${currentChannelId}`);
    currentSubscribeChannel.current = channel;
    channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `dm_id=eq.${currentChannelId}`,
        },
        newMessageInChannel
      )
      .subscribe();
  };

  // 메시지를 보내는 함수
  const sendHandler: SubmitHandler<FieldValues> = async (values) => {
    sendMessage(
      {
        currentDmChannel: currentDmChannel!,
        message: values["send-input"],
        receiverId: otherUserId,
        spaceId,
      },
      {
        onSuccess: (createdChannel) => {
          if (createdChannel) {
            queryClient.invalidateQueries({
              queryKey: ["dmChannel", otherUserId],
            });
            // 최초 보낸 메시지 state에 추가
            setMessages([
              {
                created_at: new Date().toISOString(),
                dm_id: createdChannel.id,
                id: "first_send",
                message: values["send-input"],
                sender: currentUser,
                receiver: otherUserInfo!,
              },
            ]);
            // dm 채널 연결
            connectChannel(createdChannel.id);
          }
        },
      }
    );
    reset();
  };

  // 최초 mount시 상대방 유저와 dm channel 있는지 확인 후 채널 연결
  useEffect(() => {
    if (currentDmChannel) {
      // dm 채널 연결
      connectChannel(currentDmChannel);
    }
  }, [currentDmChannel]);

  // 최초 mount시 기존 메시지 불러오기
  useEffect(() => {
    setMessages(prevDmMessages!);
  }, [prevDmMessages]);

  // 스크롤이 자동으로 맨 아래로 가도록
  useEffect(() => {
    if (messageListRef.current)
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  // unMount 시 현재 구독중인 dm 채널 구독 취소
  useEffect(() => {
    return () => {
      if (currentSubscribeChannel.current)
        supabase.removeChannel(currentSubscribeChannel.current);
    };
  }, []);

  return (
    <StMetaverseDmChannel>
      <button onClick={() => handleCloseDmContainer(otherUserInfo?.id!)}>
        close
      </button>
      <h1>상대방 유저 정보 : {otherUserInfo?.display_name}</h1>
      <ul ref={messageListRef}>
        {messages?.map((message) => (
          <li key={message.id}>
            <h3>{message.sender?.display_name}</h3>
            <span>{message.message}</span>
            <span>{message.created_at}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(sendHandler)}>
        <input
          id="send-input"
          type="text"
          placeholder="메시지를 입력하세요"
          {...register("send-input", {
            required: true,
          })}
        />
        <button type="submit">입력</button>
      </form>
    </StMetaverseDmChannel>
  );
}

const StMetaverseDmChannel = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  & ul {
    height: 80%;
    overflow-y: scroll;
    font-size: 2rem;
  }
`;
