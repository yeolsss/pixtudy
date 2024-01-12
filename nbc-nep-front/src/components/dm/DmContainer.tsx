import { useGetOtherUserInfo, useSendMessage } from "@/hooks/query/useSupabase";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const { handleSubmit, register, reset } = useForm();
  const getOtherUser = useGetOtherUserInfo();
  const [otherUser, setOtherUser] = useState<Tables<"users">>();
  const sendMessage = useSendMessage();

  const sendHandler: SubmitHandler<FieldValues> = async (values) => {
    if (typeof currentSpaceId === "string")
      sendMessage({
        message: values["send-input"],
        receiverId: otherUserId,
        spaceId: currentSpaceId,
      });
    reset();
  };

  // 상대 유저의 정보를 불러오는 useEffect
  useEffect(() => {
    getOtherUser(
      { otherUserId },
      {
        onSuccess: (otherUserInfo) => {
          if (otherUserInfo) setOtherUser(otherUserInfo);
        },
      }
    );
  }, []);

  // // 상대 유저와 대화 내용 가져오기
  // useEffect(() => {
  //   getOtherUser(
  //     { otherUserId },
  //     {
  //       onSuccess: (otherUserInfo) => {
  //         if (otherUserInfo) setOtherUser(otherUserInfo);
  //       },
  //     }
  //   );
  // }, []);

  return (
    <section>
      <button onClick={() => handleCloseDmContainer(otherUserId)}>close</button>
      <h1>상대방 유저 정보 : {otherUser?.display_name}</h1>
      <ul></ul>
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
