import { create } from "zustand";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/supabase/types/supabase.tables.type";

interface ScrumBoardItemBackDropState {
  isOpen: boolean;
  isOpenCategoryBackDrop: boolean;
  category: Kanban_categories;
  // 없으면 등록 있으면 디테일
  kanbanItem: GetKanbanItemsByAssignees | null;
  setIsOpen: (
    categoryId: Kanban_categories,
    kanbanItem: GetKanbanItemsByAssignees | null
  ) => void;
  setCategory: (categoryId: Kanban_categories) => void;
  closeBackDrop: () => void;
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void;
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as Kanban_categories,
  kanbanItem: null,
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setIsOpenCategoryBackDrop: () => {},
};
const useScrumBoardItemBackDrop = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (category, kanbanItem = null) =>
      set({ isOpen: true, category, kanbanItem }),
    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    closeBackDrop: () =>
      set({
        isOpen: false,
        category: {} as Kanban_categories,
        kanbanItem: null,
      }),
  })
);

export default useScrumBoardItemBackDrop;
