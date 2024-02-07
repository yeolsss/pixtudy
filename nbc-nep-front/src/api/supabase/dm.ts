import { supabase } from "@/supabase";
import { SpaceMembers } from "@/types/supabase.tables.types";
import { Database, Tables } from "@/types/supabase.types";

/**
 * 유저의 space 정보를 가져오는 함수
 * @param {string} currentUserId - space 정보를 가져올 현재유저
 * @returns -> join table <space_members & users>
 */
export const getUserSpaces = async (
  currentUserId: string
): Promise<SpaceMembers[]> => {
  const { data: userSpaces, error } = await supabase
    .from("space_members")
    .select(`*,spaces(*)`)
    .eq("user_id", currentUserId)
    .returns<SpaceMembers[]>();
  if (error) throw error;
  return userSpaces;
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
  const dmChannel = await supabase.rpc("get_dm_channels", {
    p_space_id: spaceId,
    p_user_id: currentUserId,
    p_receiver_id: receiverId,
  });

  return dmChannel.data?.length ? dmChannel.data[0].id : null;
};

export interface getDmChannelMessagesReturns {
  id: string;
  created_at: string;
  dm_id: string;
  message: string;
  sender?: Partial<Tables<"users">>;
  receiver?: Partial<Tables<"users">>;
  sender_id?: string;
  sender_display_name?: string;
  receiver_id?: string;
  receiver_display_name?: string;
}

/**
 * 상대 유저 DM 채널에 따른 기존 메시지 가져오기
 * @param {string|null} dmChannel - 기존 메시지를 확인하기 위한 채널 id, 기존에 생성된 channel이 없다면 null
 * @returns getDmChannelMessagesReturns[]|[] 채널이 이미 있었다면 메시지 정보를 담은 배열, 없었다면 빈 배열
 */
export const getDmChannelMessages = async (
  dmChannel: string | null
): Promise<getDmChannelMessagesReturns[]> => {
  // 채팅방이 없을 때는 빈배열 반환
  if (!dmChannel) return [];
  const channelMessages = await supabase
    .rpc("get_dm_channel_messages_test", {
      p_dm_channel: dmChannel,
    })
    .returns<getDmChannelMessagesReturns[]>();
  return channelMessages.data as getDmChannelMessagesReturns[];
};

interface createDmChannelArgs {
  spaceId: string;
  currentUserId: string;
  receiverId: string;
}

/**
 * dm 채널을 supabase 상에 등록하는 로직
 * @param string spaceId - 등록할 space의 id;
 * @param string currentUserId - 등록할 현재 세션의 유저 id ;
 * @param string receiverId - 등록할 상대방 유저의 id;
 * @return table <dm_channels>
 */
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

export interface sendMessageArgs {
  currentDmChannel: string | null;
  message: string;
  receiverId: string;
  spaceId: string;
  currentUserId: string;
}

/**
 * DM 메시지를 보내는 함수
 * 조건부 처리
 * (1) 기존 해당 유저와 channel이 없었을 때
 *    - channel 생성 후 메시지 전송
 * (2) 기존 해당 유저와 channel이 있었을 때
 *    - 메시지 전송
 *
 * @param {string|null} currentDmChannel
 * @param {string} message
 * @param {string} receiverId
 * @param {string} spaceId
 * @param {string} currentUserId
 * @returns table <dm_channels> - 기존에 dm channel이 없어 생성한 경우에만 반환 (조건부)
 */
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
  }
  // (2) 채팅방이 기존에 있는 경우
  // 해당 채팅방으로 메시지 바로 전송
  await send(currentDmChannel);
  return null;
};

export const getLastDmMessageList = async (
  spaceId: string,
  userId: string
): Promise<
  | Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
  | undefined
> => {
  const { data, error } = await supabase
    .rpc("get_last_dm_message_list", {
      input_space_id: spaceId,
      input_user_id: userId,
    })
    .returns<
      Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"]
    >();

  if (error) {
    console.error("Error fetching messages:", error);
    return undefined;
  }
  return data;
};

interface ReadDmMessage {
  roomId: string;
  receiverId: string;
}

export const readDmMessage = async ({ roomId, receiverId }: ReadDmMessage) => {
  const { error } = await supabase
    .from("dm_messages")
    .update({ checked: "R" })
    .eq("dm_id", roomId)
    .eq("receiver_id", receiverId)
    .select();
  if (error) throw new Error(error.message);
};

export const getSpaceMemberInfo = async ({
  spaceId,
  userId,
}: {
  spaceId: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("space_members")
    .select("*")
    .eq("space_id", spaceId)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};
