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
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  otherUserId: string;
  handleCloseDmContainer: (id: string) => void;
}

export default function DmContainer({
  otherUserId,
  handleCloseDmContainer,
}: Props) {
  const router = useRouter();
  const currentSpaceId = router.query.index;

  const getOtherUser = useGetOtherUserInfo();
  const sendMessage = useSendMessage();
  const getDmMessages = useGetDmMessages();
  const getDmChannel = useGetDmChannel();

  const { handleSubmit, register, reset } = useForm();

  // const [otherUser, setOtherUser] = useState<Tables<"users">>();
  const [messages, setMessages] = useState<getDmChannelMessagesReturns[]>([]);

  const currentSubscribeChannel = useRef<RealtimeChannel | null>(null);
  const currentUser = useAppSelector((state) => state.authSlice.user);
  const otherUser = useRef<Tables<"users"> | null>(null);

  // 입력 이벤트
  const sendHandler: SubmitHandler<FieldValues> = async (values) => {
    if (typeof currentSpaceId === "string")
      sendMessage(
        {
          message: values["send-input"],
          receiverId: otherUserId,
          spaceId: currentSpaceId,
        },
        {
          onSuccess: (payload) => {
            if (payload) {
              setMessages((prev) => [
                ...prev,
                {
                  created_at: new Date().toISOString(),
                  dm_id: payload.id,
                  id: "1",
                  message: values["send-input"],
                  sender: currentUser,
                  receiver: null,
                },
              ]);
              const channel = supabase.channel(`dm_${payload.id}`);
              currentSubscribeChannel.current = channel;
              channel
                .on(
                  "postgres_changes",
                  {
                    event: "INSERT",
                    schema: "public",
                    table: "dm_messages",
                    filter: `dm_id=eq.${payload.id}`,
                  },
                  (payload) => {
                    const newMessage: getDmChannelMessagesReturns = {
                      created_at: payload.new.created_at,
                      dm_id: payload.new.dm_id,
                      id: payload.new.id,
                      message: payload.new.message,
                      receiver:
                        currentUser.id === payload.new.receiver_id
                          ? currentUser
                          : otherUser.current,
                      sender:
                        currentUser.id === payload.new.sender_id
                          ? currentUser
                          : otherUser.current,
                    };
                    setMessages((prev) => [...prev, newMessage]);
                  }
                )
                .subscribe();
            }
          },
        }
      );
    reset();
  };

  // 상대 유저와의 채널을 탐색하여 subscribe 시키는 useEffct
  useEffect(() => {
    if (typeof currentSpaceId === "string") {
      getDmChannel(
        {
          receiverId: otherUserId,
          spaceId: currentSpaceId,
        },
        {
          onSuccess: (currentDmChannel) => {
            if (currentDmChannel) {
              const channel = supabase.channel(`dm_${currentDmChannel}`);
              currentSubscribeChannel.current = channel;
              channel
                .on(
                  "postgres_changes",
                  {
                    event: "INSERT",
                    schema: "public",
                    table: "dm_messages",
                    filter: `dm_id=eq.${currentDmChannel}`,
                  },
                  (payload) => {
                    const newMessage: getDmChannelMessagesReturns = {
                      created_at: payload.new.created_at,
                      dm_id: payload.new.dm_id,
                      id: payload.new.id,
                      message: payload.new.message,
                      receiver:
                        currentUser.id === payload.new.receiver_id
                          ? currentUser
                          : otherUser.current,
                      sender:
                        currentUser.id === payload.new.sender_id
                          ? currentUser
                          : otherUser.current,
                    };
                    setMessages((prev) => [...prev, newMessage]);
                  }
                )
                .subscribe();
            }
          },
        }
      );
    }
  }, []);

  // // 상대 유저와 대화 내용 가져오기
  useEffect(() => {
    if (typeof currentSpaceId === "string") {
      getDmMessages(
        { receiverId: otherUserId, spaceId: currentSpaceId },
        {
          onSuccess: (dmMessages) => {
            console.log(dmMessages);
            setMessages(dmMessages);
          },
        }
      );
    }
  }, []);

  // 상대 유저의 정보를 불러오는 useEffect
  useEffect(() => {
    getOtherUser(
      { otherUserId },
      {
        onSuccess: (otherUserInfo) => {
          if (otherUserInfo) otherUser.current = otherUserInfo;
        },
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      // unMount 시 채널 구독 취소
      if (currentSubscribeChannel.current)
        supabase.removeChannel(currentSubscribeChannel.current);
    };
  }, []);

  return (
    <section>
      <button onClick={() => handleCloseDmContainer(otherUserId)}>close</button>
      <h1>상대방 유저 정보 : {otherUser.current?.display_name}</h1>
      <ul>
        {messages.map((message) => (
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
    </section>
  );
}
