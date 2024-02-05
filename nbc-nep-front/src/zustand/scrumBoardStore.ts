import { Kanban_categories } from "@/types/supabase.tables.types";
import createSelectors from "@/zustand/config/createSelector";
import { create } from "zustand";

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
