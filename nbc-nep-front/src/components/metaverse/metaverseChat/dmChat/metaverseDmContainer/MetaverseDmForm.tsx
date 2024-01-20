import React from "react";
import useFocusOutInput from "@/hooks/phaser/useFocusOutInput";
import { useQueryClient } from "@tanstack/react-query";
import useInput from "@/hooks/useInput";
import { useSendMessage } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import { Tables } from "@/supabase/types/supabase";

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
  const { otherUserId, spaceId } = useAppSelector((state) => state.dm);

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
                sender_display_name: currentUser.display_name!,
                receiver_display_name: otherUserInfo!.display_name!,
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
      <input
        id="send-input"
        type="text"
        placeholder="메시지를 입력하세요"
        value={DMMessage}
        ref={inputRef}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit">입력</button>
    </form>
  );
}