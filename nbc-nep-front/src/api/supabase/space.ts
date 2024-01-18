import { supabase } from "@/libs/supabase";
import { Tables, TablesInsert } from "@/types/supabase";

export const createSpaceHandler = async (
  spaceInfo: TablesInsert<"spaces"> & {
    space_display_name: string;
    space_avatar: string;
  }
): Promise<Tables<"spaces">> => {
  const space: TablesInsert<"spaces"> = {
    description: spaceInfo.description,
    owner: spaceInfo.owner,
    title: spaceInfo.title,
  };
  const { data: spaceData, error } = await supabase
    .from("spaces")
    .insert(space)
    .select("*")
    .single();
  if (error) return Promise.reject(error);

  if (spaceData) {
    const ownerInfo: TablesInsert<"space_members"> = {
      space_id: spaceData.id,
      user_id: spaceData.owner,
      space_avatar: spaceInfo.space_avatar,
      space_display_name: spaceInfo.space_display_name,
    };
    const { data, error } = await supabase
      .from("space_members")
      .insert(ownerInfo);
    if (error) return Promise.reject(error);
  }

  return spaceData;
};

export const joinSpaceHandler = async (
  user: TablesInsert<"space_members">
): Promise<Tables<"space_members">> => {
  const { data, error } = await supabase
    .from("space_members")
    .insert(user)
    .select("*")
    .single();
  if (error) return Promise.reject(error);

  return data;
};

export const getSpaceData = async (spaceId: string) => {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .eq("id", spaceId)
    .single();

  if (error) {
    console.error(error);
    return false;
  }

  return data;
};

export const getPlayerSpaceData = async (
  spaceId: string
): Promise<Tables<"space_members">> => {
  const { data: currentUsersSession } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("space_members")
    .select("*")
    .eq("user_id", currentUsersSession.session?.user.id!)
    .eq("space_id", spaceId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message); // 에러를 던집니다.
  }

  return data;
};
