import { supabase } from "@/libs/supabase";
import { Tables } from "@/types/supabase";
import { Space_members } from "@/types/supabase.tables.type";

import { getUserSessionHandler } from "./auth";

/**
 * 유저의 space 정보를 가져오는 함수
 * @param string currentUserId - space 정보를 가져올 현재유저
 * @returns -> join table <space_members & users>
 */
export const getUserSpaces = async (
  currentUserId: string
): Promise<Space_members[]> => {
  const { data: userSpaces, error } = await supabase
    .from("space_members")
    .select(`*,spaces(*)`)
    .eq("user_id", currentUserId)
    .returns<Space_members[]>();
  if (error) throw error;
  return userSpaces;
};

/**
 * 스페이스 별 전체 유저정보를 가져오는 함수
 * @param string space_id - 스페이스의 전체유저를 가져올 space id 값
 * @returns -> join table <space_members & users>
 */
export const getSpaceUsers = async (
  space_id: string
): Promise<Space_members[] | null> => {
  const currentUser = await getUserSessionHandler();
  const { data } = await supabase
    .from("space_members")
    .select(`*, users(*)`)
    .filter("space_id", "eq", space_id)
    .filter("user_id", "neq", currentUser?.id)
    .returns<Space_members[]>();

  return data;
};

/**
 * 상대 유저와 DM 채널 확인
 * @param string receiverId - 상대 유저 아이디
 * @param string currentUserId - 현재 세션의 유저 아이디
 * @param string receiverId - 상대 유저 아이디
 * @returns 이미 dm 채널이 있다면 해당 dm채널의 아이디 / 없다면 null
 */
export interface checkDmChannelArgs {
  receiverId: string;
  currentUserId: string;
  spaceId: string;
}

export const checkDmChannel = async ({
  receiverId,
  currentUserId,
  spaceId,
}: checkDmChannelArgs) => {
  const dm_channel = await supabase.rpc("get_dm_channels", {
    p_space_id: spaceId,
    p_user_id: currentUserId,
    p_receiver_id: receiverId,
  });

  return dm_channel.data?.length ? dm_channel.data[0].id : null;
};

/**
 * 상대 유저 DM 채널에 따른 기존 메시지 가져오기
 * @param string|null dmChannel - 기존 메시지를 확인하기 위한 채널 id, 기존에 생성된 channel이 없다면 null
 * @returns getDmChannelMessagesReturns[]|[] 채널이 이미 있었다면 메시지 정보를 담은 배열, 없었다면 빈 배열
 */
export interface getDmChannelMessagesReturns {
  id: string;
  created_at: string;
  dm_id: string;
  message: string;
  sender: Tables<"users">;
  receiver: Tables<"users">;
}

export const getDmChannelMessages = async (dmChannel: string | null) => {
  // 채팅방이 없을 때는 빈배열 반환
  if (!dmChannel) return [];
  const channelMessages = await supabase.rpc("get_dm_channel_messages", {
    p_dm_channel: dmChannel,
  });
  return channelMessages.data as getDmChannelMessagesReturns[];
};

/**
 * dm 채널을 supabase 상에 등록하는 로직
 * @param string spaceId - 등록할 space의 id;
 * @param string currentUserId - 등록할 현재 세션의 유저 id ;
 * @param string receiverId - 등록할 상대방 유저의 id;
 * @return table <dm_channels>
 */
interface createDmChannelArgs {
  spaceId: string;
  currentUserId: string;
  receiverId: string;
}

const createDmChannel = async ({
  spaceId,
  currentUserId,
  receiverId,
}: createDmChannelArgs) => {
  const { data: newDmChannel, error } = await supabase
    .from("dm_channels")
    .insert({
      space_id: spaceId,
      user: currentUserId,
      other_user: receiverId,
    })
    .select(`*`)
    .single();

  if (error) throw error;
  return newDmChannel;
};

/**
 * DM 메시지를 보내는 함수
 * 조건부 처리
 * (1) 기존 해당 유저와 channel이 없었을 때
 *    - channel 생성 후 메시지 전송
 * (2) 기존 해당 유저와 channel이 있었을 때
 *    - 메시지 전송
 * @param string|null currentDmChannel - 메시지가 전송될 dm 채널, 기존에 있으면 string, 없으면 null
 * @param string message - 메시지 내용
 * @param string receiver_id - 상대방 유저의 id (receiver)
 * @param string space_id - 현재 space의 id (create channel용)
 * @param string currentUserId - 현재 세션의 유저 id (sender)
 * @returns table <dm_channels> - 기존에 dm channel이 없어 생성한 경우에만 반환 (조건부)
 */
export interface sendMessageArgs {
  currentDmChannel: string | null;
  message: string;
  receiverId: string;
  spaceId: string;
  currentUserId: string;
}
export const sendMessage = async ({
  currentDmChannel,
  message,
  receiverId,
  spaceId,
  currentUserId,
}: sendMessageArgs) => {
  // send logic
  const send = async (channel: string) => {
    await supabase.from("dm_messages").insert({
      dm_id: channel,
      message,
      receiver_id: receiverId,
      sender_id: currentUserId,
    });
  };
  // 조건부 처리
  // (1)채팅방이 기존에 없는 경우
  if (!currentDmChannel) {
    // (1-1) 채팅방 생성
    const newDmChannel = await createDmChannel({
      currentUserId,
      receiverId,
      spaceId,
    });
    // (1-2) 메시지 보내기
    if (newDmChannel) {
      await send(newDmChannel.id);
    }
    return newDmChannel;
  } else {
    // (2) 채팅방이 기존에 있는 경우
    // 해당 채팅방으로 메시지 바로 전송
    await send(currentDmChannel);
  }
};
