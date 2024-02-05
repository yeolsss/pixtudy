import { Kanban_categories } from "@/types/supabase.tables.types";
import useScrumBoardStore from "@/zustand/scrumBoardStore";

interface ReturnType {
  categories: Kanban_categories[];
  setCategories: (categories: any[]) => void;
}
export default function useScrumBoard(): ReturnType {
  const categories = useScrumBoardStore.use.categories();
  const setCategories = useScrumBoardStore.use.setCategories();

  return { categories, setCategories };
}
