import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import { useGetDmMessages, useReadDMMessage } from "@/hooks/query/useSupabase";
import useAuth from "@/zustand/authStore";
import useDm from "@/zustand/dmStore";
import React, { useEffect } from "react";

interface UseDmMessageParams {
  currentDmChannel: string | null | undefined;
  setMessages: React.Dispatch<
    React.SetStateAction<getDmChannelMessagesReturns[]>
  >;
}
export default function useDmMessage({
  currentDmChannel,
  setMessages,
}: UseDmMessageParams) {
  // 상대방 유저와 기존 메시지 가져오기
  const prevDmMessages = useGetDmMessages(currentDmChannel!);

  const { mutate, isPending, isError } = useReadDMMessage();
  const { dmRoomId } = useDm();

  // 현재 세션의 유저정보
  const { user: currentUser } = useAuth();

  // 채팅창에 들어오면 읽은것으로 간주.
  useEffect(() => {
    mutate({ roomId: dmRoomId, receiverId: currentUser.id });
    return () => {
      mutate({ roomId: dmRoomId, receiverId: currentUser.id });
    };
  }, []);

  // 최초 mount시 기존 메시지 불러오기
  useEffect(() => {
    setMessages(prevDmMessages!);
  }, [prevDmMessages]);
}
