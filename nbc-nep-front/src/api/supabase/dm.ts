import { supabase } from "@/libs/supabase";
import { Space_members } from "@/types/supabase.tables.type";
import { getUserSessionHandler } from "./auth";

/**
 * 유저의 space 정보를 가져오는 함수
 * @returns
 */
export const getUserSpaces = async () => {
  const currentUser = await getUserSessionHandler();
  const { data } = await supabase
    .from("space_members")
    .select(`*,spaces(*)`)
    .eq("user_id", currentUser?.user.id!)
    .returns<Space_members[]>();
  return data;
};

interface GetUserDmChannelArgs {
  space_id: string;
}

/**
 * 스페이스 별 전체 유저정보를 가져오는 함수
 * 테스트 용 입니다. (dm)
 */
export const getSpaceUsers = async ({ space_id }: GetUserDmChannelArgs) => {
  const currentUser = await getUserSessionHandler();
  const { data } = await supabase
    .from("space_members")
    .select(`*, users(*)`)
    .filter("space_id", "eq", space_id)
    .filter("user_id", "neq", currentUser?.user.id)
    .returns<Space_members[]>();
  return data;
};

/**
 * 유저별 dm 채널 가져오기
 */
export const getUserDmChannel = async ({ space_id }: GetUserDmChannelArgs) => {
  const currentUser = await getUserSessionHandler();
  const { data } = await supabase
    .from("dm_channels")
    .select(`*`)
    .filter("space_id", "eq", space_id)
    .or(
      `user.eq.${currentUser?.user.id},other_user.eq.${currentUser?.user.id}`
    );
  return data;
};
