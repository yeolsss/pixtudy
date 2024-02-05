import useScrumBoardStore from "@/zustand/scrumBoardStore";
import { KanbanCategories } from "@/types/supabase.tables.types";

interface ReturnType {
  categories: KanbanCategories[];
  setCategories: (categories: any[]) => void;
}
export default function useScrumBoard(): ReturnType {
  const categories = useScrumBoardStore.use.categories();
  const setCategories = useScrumBoardStore.use.setCategories();

  return { categories, setCategories };
}
