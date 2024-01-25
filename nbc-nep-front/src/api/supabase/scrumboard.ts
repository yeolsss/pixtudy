import { supabase } from "@/supabase/supabase";
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
