import { create } from "zustand";
import {
  GetKanbanItemsByAssignees,
  KanbanCategories,
} from "@/types/supabase.tables.types";
import { BackDropType } from "@/types/scrum.types";
import createSelectors from "@/zustand/config/createSelector";

interface ScrumBoardItemBackDropState {
  isOpen: boolean;
  isOpenCategoryBackDrop: boolean;
  category: KanbanCategories;
  kanbanItem: GetKanbanItemsByAssignees | null;
  backDropType: BackDropType | null | undefined;
  setIsOpen: (
    categoryId: KanbanCategories,
    kanbanItem: GetKanbanItemsByAssignees | null,
    backDropType: BackDropType | null | undefined
  ) => void;
  setCategory: (categoryId: KanbanCategories) => void;
  closeBackDrop: () => void;
  setBackDropType: (backDropType: BackDropType) => void;
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void;
  setKanbanDescription: (description: string) => void;
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as KanbanCategories,
  kanbanItem: null,
  backDropType: "create" as BackDropType | null | undefined,
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setBackDropType: () => {},
  setIsOpenCategoryBackDrop: () => {},
  setKanbanDescription: () => {},
};
const scrumBoardItemBackDropStore = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (
      category: KanbanCategories,
      kanbanItem: GetKanbanItemsByAssignees | null,
      backDropType: BackDropType | null | undefined = null
    ) => set({ isOpen: true, category, kanbanItem, backDropType }),

    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    setBackDropType: (backDropType) => set({ backDropType }),
    setKanbanDescription: (description: string) =>
      set((state) => ({
        kanbanItem: state.kanbanItem && { ...state.kanbanItem, description },
      })),
    closeBackDrop: () =>
      set({
        isOpen: false,
        category: {} as KanbanCategories,
        kanbanItem: null,
      }),
  })
);

const useScrumBoardItemBackDropStore = createSelectors(
  scrumBoardItemBackDropStore
);
export default useScrumBoardItemBackDropStore;
