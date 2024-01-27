import { create } from "zustand";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/supabase/types/supabase.tables.type";
import { BackDropType } from "@/components/scrumboard/types/scrumTypes";

interface ScrumBoardItemBackDropState {
  isOpen: boolean;
  isOpenCategoryBackDrop: boolean;
  category: Kanban_categories;
  kanbanItem: GetKanbanItemsByAssignees | null;
  backDropType: BackDropType;
  setIsOpen: (
    categoryId: Kanban_categories,
    kanbanItem: GetKanbanItemsByAssignees | null,
    backDropType: BackDropType
  ) => void;
  setCategory: (categoryId: Kanban_categories) => void;
  closeBackDrop: () => void;
  setBackDropType: (backDropType: BackDropType) => void;
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void;
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as Kanban_categories,
  kanbanItem: null,
  backDropType: "create",
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setBackDropType: () => {},
  setIsOpenCategoryBackDrop: () => {},
};
const useScrumBoardItemBackDrop = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (category, kanbanItem = null, backDropType) =>
      set({ isOpen: true, category, kanbanItem, backDropType }),
    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    setBackDropType: (backDropType) => set({ backDropType }),
    closeBackDrop: () =>
      set({
        isOpen: false,
        category: {} as Kanban_categories,
        kanbanItem: null,
      }),
  })
);

export default useScrumBoardItemBackDrop;
