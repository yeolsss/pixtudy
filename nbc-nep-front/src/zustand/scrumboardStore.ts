import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface ScrumboardState {
  categories: Kanban_categories[];
  setCategories: (fetchedCategories: Kanban_categories[]) => void;
}

const initialState = {
  categories: [],
};

const scrumboardStore = create<ScrumboardState>((set) => ({
  ...initialState,
  setCategories: (fetchedCategories: Kanban_categories[]) => {
    set({ categories: fetchedCategories });
  },
}));

export default scrumboardStore;
