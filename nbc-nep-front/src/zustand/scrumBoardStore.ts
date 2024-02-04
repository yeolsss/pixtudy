import { KanbanCategories } from '@/types/supabase.tables.types'
import createSelectors from '@/zustand/config/createSelector'
import { create } from 'zustand'

interface ScrumBoardState {
  categories: KanbanCategories[]
  setCategories: (fetchedCategories: KanbanCategories[]) => void
}

const initialState = {
  categories: []
}

const scrumBoardStore = create<ScrumBoardState>((set) => ({
  ...initialState,
  setCategories: (fetchedCategories: KanbanCategories[]) => {
    set({ categories: fetchedCategories })
  }
}))

const useScrumBoardStore = createSelectors(scrumBoardStore)
export default useScrumBoardStore
