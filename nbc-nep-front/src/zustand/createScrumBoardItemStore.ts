import { create } from 'zustand'
import {
  GetKanbanItemsByAssignees,
  Kanban_categories
} from '@/types/supabase.tables.types'
import { BackDropType } from '@/types/scrum.types'
import createSelectors from '@/zustand/config/createSelector'

interface ScrumBoardItemBackDropState {
  isOpen: boolean
  isOpenCategoryBackDrop: boolean
  category: Kanban_categories
  kanbanItem: GetKanbanItemsByAssignees | null
  backDropType: BackDropType
  setIsOpen: (
    categoryId: Kanban_categories,
    kanbanItem: GetKanbanItemsByAssignees | null,
    backDropType: BackDropType
  ) => void
  setCategory: (categoryId: Kanban_categories) => void
  closeBackDrop: () => void
  setBackDropType: (backDropType: BackDropType) => void
  setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop: boolean) => void
  setKanbanDescription: (description: string) => void
}
const initialState: ScrumBoardItemBackDropState = {
  isOpen: false,
  isOpenCategoryBackDrop: false,
  category: {} as Kanban_categories,
  kanbanItem: null,
  backDropType: 'create',
  setIsOpen: () => {},
  setCategory: () => {},
  closeBackDrop: () => {},
  setBackDropType: () => {},
  setIsOpenCategoryBackDrop: () => {},
  setKanbanDescription: () => {}
}
const scrumBoardItemBackDropStore = create<ScrumBoardItemBackDropState>()(
  (set) => ({
    ...initialState,
    setIsOpen: (category, kanbanItem = null, backDropType) =>
      set({ isOpen: true, category, kanbanItem, backDropType }),
    setIsOpenCategoryBackDrop: (isOpenCategoryBackDrop) =>
      set({ isOpenCategoryBackDrop }),
    setCategory: (category) => set({ category }),
    setBackDropType: (backDropType) => set({ backDropType }),
    setKanbanDescription: (description: string) =>
      set((state) => ({
        kanbanItem: state.kanbanItem && { ...state.kanbanItem, description }
      })),
    closeBackDrop: () =>
      set({
        isOpen: false,
        category: {} as Kanban_categories,
        kanbanItem: null
      })
  })
)

const useScrumBoardItemBackDropStore = createSelectors(
  scrumBoardItemBackDropStore
)
export default useScrumBoardItemBackDropStore
