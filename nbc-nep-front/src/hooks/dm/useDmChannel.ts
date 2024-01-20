import { supabase } from "@/libs/supabase";
import React, { useEffect, useRef } from "react";
import {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";
import { Tables } from "@/types/supabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import { useGetDmChannel } from "@/hooks/query/useSupabase";

interface useDmChannelPrams {
  otherUserInfo: Tables<"users"> | null | undefined;
  setMessages: React.Dispatch<
    React.SetStateAction<getDmChannelMessagesReturns[]>
  >;
}

interface useDmChannelReturns {
  connectChannel: (currentChannelId: string) => void;
  currentDmChannel: string | null | undefined;
}
export default function useDmChannel({
  otherUserInfo,
  setMessages,
}: useDmChannelPrams): useDmChannelReturns {
  const { otherUserId, spaceId } = useAppSelector((state) => state.dm);
  // 현재 세션의 유저정보
  const currentUser = useAppSelector((state) => state.authSlice.user);
  // 현재 구독중인 채널 정보
  const currentSubscribeChannel = useRef<RealtimeChannel | null>(null);

  // 상대방 유저와 활성화된 dm 채널 아이디
  // 채널이 이미 있을 때: string/ 없을 때: null
  const currentDmChannel = useGetDmChannel({
    receiverId: otherUserId,
    spaceId,
  });

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

  // unMount 시 현재 구독중인 dm 채널 구독 취소
  useEffect(() => {
    return () => {
      if (currentSubscribeChannel.current)
        supabase.removeChannel(currentSubscribeChannel.current);
    };
  }, []);

  // 최초 mount시 상대방 유저와 dm channel 있는지 확인 후 채널 연결
  useEffect(() => {
    if (currentDmChannel) {
      // dm 채널 연결
      connectChannel(currentDmChannel);
    }
  }, [currentDmChannel]);

  return { connectChannel, currentDmChannel };
}
