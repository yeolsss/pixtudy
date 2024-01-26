import { supabase } from "@/supabase/supabase";
import { Space_members } from "@/supabase/types/supabase.tables.type";

export const getSpaceUsers = async (spaceId: string) => {
  const { data, error } = await supabase
    .from("space_members")
    .select("*, users(*)")
    .eq("space_id", spaceId)
    .returns<Space_members[]>();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
