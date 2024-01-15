import { supabase } from "@/libs/supabase";
import { TablesInsert } from "@/types/supabase";

export async function joinSpaceHandler(user: TablesInsert<"space_members">) {
  const { data, error } = await supabase.from("space_members").insert(user);
  if (error) return Promise.reject(error);

  return data;
}
