import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface ScrumBoardState {
  categories: Kanban_categories[];
  setCategories: (fetchedCategories: Kanban_categories[]) => void;
}

const initialState = {
  categories: [],
};

const useScrumBoardStore = create<ScrumBoardState>((set) => ({
  ...initialState,
  setCategories: (fetchedCategories: Kanban_categories[]) => {
    set({ categories: fetchedCategories });
  },
}));

export default useScrumBoardStore;
