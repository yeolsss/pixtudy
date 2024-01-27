import useScrumBoardStore from "@/zustand/scrumBoardStore";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";

interface ReturnType {
  categories: Kanban_categories[];
  setCategories: (categories: any[]) => void;
}
export default function useScrumBoard(): ReturnType {
  const categories = useScrumBoardStore((state) => state.categories);
  const setCategories = useScrumBoardStore((state) => state.setCategories);

  return { categories, setCategories };
}
