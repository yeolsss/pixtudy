import { Kanban_categories } from "@/types/supabase.tables.types";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface ScrumBoardState {
  categories: Kanban_categories[];
  setCategories: (fetchedCategories: Kanban_categories[]) => void;
}

const initialState = {
  categories: [],
};

const scrumBoardStore = create<ScrumBoardState>((set) => ({
  ...initialState,
  setCategories: (fetchedCategories: Kanban_categories[]) => {
    set({ categories: fetchedCategories });
  },
}));

const useScrumBoardStore = createSelectors(scrumBoardStore);
export default useScrumBoardStore;
