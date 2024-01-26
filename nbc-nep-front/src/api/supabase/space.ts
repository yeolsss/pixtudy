import { CreateSpaceInfo } from "@/components/spaces/types/space.types";
import { supabase } from "@/supabase/supabase";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types/supabase";

export const createSpaceHandler = async (
  spaceInfo: CreateSpaceInfo
): Promise<Tables<"spaces">> => {
  const space: TablesInsert<"spaces"> = {
    description: spaceInfo.description!,
    owner: spaceInfo.owner!,
    title: spaceInfo.title!,
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
  try {
    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", spaceId)
      .single();

    if (error) return Promise.reject(error);

    return data;
  } catch (error) {
    console.error(error);
  }
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

  if (error) return Promise.reject(error);

  return data;
};

export const removeSpace = async (spaceId: string): Promise<void> => {
  const { error } = await supabase.from("spaces").delete().eq("id", spaceId);

  if (error) return Promise.reject(error);
};

export const updateSpace = async (
  updatedSpace: TablesUpdate<"spaces"> & { id: string }
): Promise<Tables<"spaces">> => {
  const { data, error } = await supabase
    .from("spaces")
    .update(updatedSpace)
    .eq("id", updatedSpace.id)
    .select()
    .single();

  if (error) return Promise.reject(error);

  return data;
};
