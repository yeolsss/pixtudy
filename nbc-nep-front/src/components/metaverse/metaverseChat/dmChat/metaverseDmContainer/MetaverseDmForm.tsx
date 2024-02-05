import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import useFocusOutInput from "@/hooks/phaser/useFocusOutInput";
import { useSendMessage } from "@/hooks/query/useSupabase";
import useInput from "@/hooks/useInput";
import { Tables } from "@/types/supabase.types";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import useDmStore from "@/zustand/dmStore";

const StChatInput = styled.input`
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

interface Props {
  currentDmChannel: string | null | undefined;
  setMessages: React.Dispatch<
    React.SetStateAction<getDmChannelMessagesReturns[]>
  >;
  otherUserInfo: Partial<Tables<"users">> | null | undefined;
  connectChannel: (currentChannelId: string) => void;
  currentUser: Tables<"users">;
}

export default function MetaverseDmForm({
  currentDmChannel,
  setMessages,
  otherUserInfo,
  connectChannel,
  currentUser,
}: Props) {
  const otherUserId = useDmStore.use.otherUserId();
  const spaceId = useDmStore.use.spaceId();
  const sendMessage = useSendMessage();

  const inputRef = useFocusOutInput();
  const queryClient = useQueryClient();
  // form 내 iuput 에 관한 custom hook
  const [DMMessage, setDMMessage, onChange, handleFocus, handleBlur] =
    useInput<string>("");
  // input 외 다른 곳 click 시 input blur custom hook

  // 메시지를 보내는 함수
  const handleOnSubmitDM = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const message = DMMessage;

    if (!message) return;

    sendMessage(
      {
        currentDmChannel: currentDmChannel!,
        message,
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
                message,
                sender_id: currentUser.id,
                sender_display_name: currentUser.displayName!,
                receiver_display_name: otherUserInfo!.displayName!,
                receiver_id: otherUserInfo!.id,
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
    setDMMessage("");
  };

  return (
    <form onSubmit={handleOnSubmitDM}>
      <StChatInput
        id="send-input"
        type="text"
        placeholder="메시지를 입력하세요"
        value={DMMessage}
        ref={inputRef}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </form>
  );
}
