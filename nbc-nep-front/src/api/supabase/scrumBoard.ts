import { supabase } from "@/supabase/supabase";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
  Space_members,
} from "@/types/supabase.tables.types";

export const getCategories = async (
  spaceId: string
): Promise<Kanban_categories[]> => {
  const { data, error } = await supabase
    .from("kanban_categories")
    .select("*")
    .eq("spaceId", spaceId)
    .order("order", { ascending: true })
    .returns<Kanban_categories[]>();
  if (error) throw error;
  return data;
};

// Promise 제네릭 인자 타입을 맞춰야할듯. 임시방편
export const getCategoryItems = async (
  categoryId: string
): Promise<GetKanbanItemsByAssignees[] | null> => {
  const { data, error } = await supabase
    .rpc("get_kanban_items_by_assignees", {
      p_category_id: categoryId,
    })
    .returns<GetKanbanItemsByAssignees[]>();
  if (error) throw error;
  return data ? data : [];
};

export const createCategory = async ({
  spaceId,
  name,
  color,
}: TablesInsert<"kanban_categories">) => {
  const { data: newCategory, error } = await supabase
    .from("kanban_categories")
    .insert({ spaceId, name, color })
    .single();
  if (error) throw error;
  return newCategory;
};

export const updateCategory = async (
  updateData: Partial<TablesUpdate<"kanban_categories">>
) => {
  const { data: newCategory, error } = await supabase
    .from("kanban_categories")
    .update(updateData)
    .eq("id", updateData.id!)
    .select();
  if (error) throw error;
  return newCategory;
};

// 여기서 삭제한 후에 모든 카테고리를 가져와야하나?
export const deleteCategory = async (categoryId: string) => {
  const { error } = await supabase
    .from("kanban_categories")
    .delete()
    .eq("id", categoryId);
  if (error) throw error;
};

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
  space_id: string;
  user_id: string;
  assignees: Space_members[];
}
export const postScrumBoardItem = async ({
  description,
  categoryId,
  assignees,
  space_id,
  user_id,
}: PostSpaceMemberPrams) => {
  const { data, error } = await supabase
    .from("kanban_items")
    .insert([
      { description, categoryId, title: "", create_user_id: user_id, space_id },
    ])
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
        space_id,
      }))
    );
  if (assigneesError) {
    throw new Error(assigneesError?.message);
  }
};

interface UpdateScrumBoardItemPrams {
  id: string;
  updateCategoryId: string;
}
export const updateCategoryItem = async ({
  id,
  updateCategoryId,
}: UpdateScrumBoardItemPrams) => {
  const { error } = await supabase
    .from("kanban_items")
    .update({ categoryId: updateCategoryId })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteCategoryItem = async (id: string) => {
  const { error } = await supabase.from("kanban_items").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export interface PatchScrumBoardItemPrams {
  id: string;
  description: string;
  space_id: string;
  assignees: Space_members[];
}
export const patchScrumBoardItem = async ({
  id,
  description,
  space_id,
  assignees,
}: PatchScrumBoardItemPrams) => {
  const { error } = await supabase
    .from("kanban_items")
    .update({ description })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const { error: assigneesDeleteError } = await supabase
    .from("kanban_assignees")
    .delete()
    .eq("kanbanItemId", id);
  if (assigneesDeleteError) {
    throw new Error(assigneesDeleteError.message);
  }

  //TODO: 함수로 뺄것.
  const { error: assigneesError } = await supabase
    .from("kanban_assignees")
    .insert(
      assignees.map((assignee) => ({
        kanbanItemId: id,
        userId: assignee.user_id,
        space_id,
      }))
    );
  if (assigneesError) {
    throw new Error(assigneesError?.message);
  }
};
