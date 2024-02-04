import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'

interface ScrumBoardItemState {
  scrumBoardText: string
  validBoardText: boolean
}
interface ScrumBoardItemStoreState extends ScrumBoardItemState {
  setScrumBoardText: (scrumBoardText: string) => void
  setValidBoardText: (validBoardText: boolean) => void
  resetScrumBoardItem: () => void
}

const initialState: ScrumBoardItemState = {
  scrumBoardText: '',
  validBoardText: false
}

const scrumBoardItemStore = create<ScrumBoardItemStoreState>()((set) => ({
  ...initialState,
  setScrumBoardText: (scrumBoardText: string) => set({ scrumBoardText }),
  setValidBoardText: (validBoardText: boolean) => set({ validBoardText }),
  resetScrumBoardItem: () =>
    set(() => {
      return {
        scrumBoardText: '',
        validBoardText: false
      }
    })
}))

const useScrumBoardItemStore = createSelectors(scrumBoardItemStore)
export default useScrumBoardItemStore
