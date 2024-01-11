import { useGetUserDMChannel } from "@/hooks/query/useSupabase";
import { supabase } from "@/libs/supabase";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function DMContainer() {
  const router = useRouter();
  const space_id = router.query.index;
  const getDmChannel = useGetUserDMChannel();
  const [messages, setMessages] = useState<Tables<"dm_messages">[]>([]);
  const { handleSubmit, register, reset } = useForm();

  const sendHandler: SubmitHandler<FieldValues> = (values) => {
    console.log(values["send-input"]);
    // TODO: 로직 구현
    // (insert event)
    reset();
  };

  // 채널 생성 및 구독을 위한 useEffect
  useEffect(() => {
    if (typeof space_id === "string") {
      //(1) 현재까지의 Talk 채널 들고오기
      getDmChannel(
        { space_id },
        {
          onSuccess: (dmChannelsInfo) => {
            //(2) 현재까지의 Talk 채널을 기준으로 channel 생성
            if (dmChannelsInfo) {
              dmChannelsInfo?.forEach((dmChannel) => {
                //(3) 현재기준 모든 채널 구독 실시
                const testChannel = supabase.channel(`dm_${dmChannel?.id}`);
                testChannel
                  .on(
                    "postgres_changes",
                    {
                      event: "INSERT",
                      schema: "public",
                      table: "dm_messages",
                      filter: `dm_id=eq.${dmChannel.id}`,
                    },
                    (payload) => {
                      console.log(payload);
                    }
                  )
                  .subscribe();
              });
            }
          },
        }
      );
    }
  }, []);
  return (
    <section>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <h2>{message.message}</h2>
            <p>{message.sender_id}</p>
            <p>{message.created_at}</p>
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
