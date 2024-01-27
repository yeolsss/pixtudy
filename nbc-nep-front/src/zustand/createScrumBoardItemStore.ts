import { create } from "zustand";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";

interface ScrumBoardItemBackDropState {
  isOpen: boolean;
  isOpenCategoryBackDrop: boolean;
  category: Kanban_categories;
  setIsOpen: (categoryId: Kanban_categories) => void;
  setCategory: (categoryId: Kanban_categories) => void;
  closeBackDrop: () => void;
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void;
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as Kanban_categories,
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setIsOpenCategoryBackDrop: () => {},
};
const useScrumBoardItemBackDrop = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (category) => set({ isOpen: true, category }),
    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    closeBackDrop: () =>
      set({ isOpen: false, category: {} as Kanban_categories }),
  })
);

export default useScrumBoardItemBackDrop;
