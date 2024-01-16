import { supabase } from "@/libs/supabase";
import { Tables, TablesInsert } from "@/types/supabase";

export async function joinSpaceHandler(user: TablesInsert<"space_members">) {
  const { data, error } = await supabase.from("space_members").insert(user);
  if (error) return Promise.reject(error);

  return data;
}

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
