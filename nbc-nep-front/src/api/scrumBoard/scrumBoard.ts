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

interface PostSpaceMemberPrams {
  description: string;
  categoryId: string;
  assignees: Space_members[];
}
export const postScrumBoardItem = async ({
  description,
  categoryId,
  assignees,
}: PostSpaceMemberPrams) => {
  const { data, error } = await supabase
    .from("kanban_items")
    .insert([{ description, categoryId, title: "" }])
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  const { error: assigneesError } = await supabase
    .from("kanban_assignees")
    .insert(
      assignees.map((assignee) => ({
        kanbanItemId: data?.[0].id,
        userId: assignee.users?.id!,
      }))
    );
  if (error) {
    throw new Error(assigneesError?.message);
  }
};
