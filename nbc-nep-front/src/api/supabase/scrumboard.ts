import { supabase } from "@/supabase/supabase";
import { TablesInsert, TablesUpdate } from "@/supabase/types/supabase";
import {
  Kanban_categories,
  Kanban_items,
} from "@/supabase/types/supabase.tables.type";

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

export const getCategoryItems = async (
  categoryId: string
): Promise<Kanban_items[]> => {
  const { data, error } = await supabase
    .from("kanban_items")
    .select("*")
    .eq("categoryId", categoryId)
    .order("created_at", { ascending: true })
    .returns<Kanban_items[]>();
  if (error) throw error;
  return data;
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
  console.log("from supabase", updateData);
  const { data: newCategory, error } = await supabase
    .from("kanban_categories")
    .update(updateData)
    .eq("id", updateData.id!)
    .select();
  if (error) throw error;
  return newCategory;
};
