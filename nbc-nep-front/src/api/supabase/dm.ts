import { supabase } from "@/libs/supabase";
import { Space_members } from "@/types/supabase.tables.type";
import { getUserSessionHandler } from "./auth";

/**
 * 유저의 space 정보를 가져오는 함수
 * @returns Space_members []
 */
export const getUserSpaces = async () => {
  const currentUser = await getUserSessionHandler();
  if (currentUser) {
    const { data } = await supabase
      .from("space_members")
      .select(`*,spaces(*)`)
      .eq("user_id", currentUser.id)
      .returns<Space_members[]>();
    return data;
  }
};

interface GetUserDmChannelArgs {
  space_id: string;
}

/**
 * 스페이스 별 전체 유저정보를 가져오는 함수
 * @param space_id string
 * @returns space_members & users join
 */
export const getSpaceUsers = async ({ space_id }: GetUserDmChannelArgs) => {
  const currentUser = await getUserSessionHandler();
  if (currentUser) {
    const { data } = await supabase
      .from("space_members")
      .select(`*, users(*)`)
      .filter("space_id", "eq", space_id)
      .filter("user_id", "neq", currentUser.id)
      .returns<Space_members[]>();
    return data;
  }
};

/**
 * 유저별 dm 채널 가져오기
 * @param space_id string
 * @returns dm_channels[]
 */
export const getUserDmChannel = async ({ space_id }: GetUserDmChannelArgs) => {
  const currentUser = await getUserSessionHandler();

  if (currentUser) {
    const { data } = await supabase
      .from("dm_channels")
      .select(`*`)
      .filter("space_id", "eq", space_id)
      .or(`user.eq.${currentUser.id},other_user.eq.${currentUser.id}`);
    return data;
  }
};

/**
 * DM 메시지를 보내는 함수
 * 조건부 처리
 * (1) 기존 해당 유저와 channel이 없었을 때
 *    - channel 생성 후 메시지 전송
 * (2) 기존 해당 유저와 channel이 있었을 때
 *    - 메시지 전송
 * @param message string
 * @param receiver_id string
 * @param space_id string
 */

interface sendMessageArgs {
  message: string;
  receiverId: string;
  spaceId: string;
}
export const sendMessage = async ({
  message,
  receiverId,
  spaceId,
}: sendMessageArgs) => {
  const currentUser = await getUserSessionHandler();
  // 채팅방 여부 확인
  const dm_channel = await supabase.rpc("get_dm_channels", {
    p_space_id: spaceId,
    p_user_id: currentUser?.id!,
    p_receiver_id: receiverId,
  });

  // (1)채팅방이 기존에 없는 경우
  if (!dm_channel.data?.length) {
    // (1-1) 채팅방 생성
    const { data: newDmChannel } = await supabase
      .from("dm_channels")
      .insert({
        space_id: spaceId,
        user: currentUser?.id!,
        other_user: receiverId,
      })
      .select(`*`)
      .single();
    // (1-2) 메시지 보내기
    if (newDmChannel) {
      await supabase.from("dm_messages").insert({
        dm_id: newDmChannel.id,
        message,
        receiver_id: receiverId,
        sender_id: currentUser?.id!,
      });
    }
  } else {
    // (2) 채팅방이 기존에 있는 경우
    // 해당 채팅방으로 메시지 바로 전송
    await supabase.from("dm_messages").insert({
      dm_id: dm_channel.data[0].id!,
      message,
      receiver_id: receiverId,
      sender_id: currentUser?.id!,
    });
  }
};
