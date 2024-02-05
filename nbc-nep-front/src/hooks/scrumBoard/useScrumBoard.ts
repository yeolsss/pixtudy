import { KanbanCategories } from "@/types/supabase.tables.types";
import useScrumBoardStore from "@/zustand/scrumBoardStore";

interface ReturnType {
  categories: KanbanCategories[];
  setCategories: (categories: KanbanCategories[]) => void;
}
export default function useScrumBoard(): ReturnType {
  const categories = useScrumBoardStore.use.categories();
  const setCategories = useScrumBoardStore.use.setCategories();

  return { categories, setCategories };
}
