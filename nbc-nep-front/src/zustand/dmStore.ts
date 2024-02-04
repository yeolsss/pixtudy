import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'

interface DMState {
  isOpen: boolean
  dmRoomId: string
  otherUserId: string
  spaceId: string
  otherUserName: string
  otherUserAvatar: string
}

interface DMStoreState extends DMState {
  openDm: (dmState: DMState) => void
  closeDm: () => void
}

const initialState: DMState = {
  isOpen: false,
  dmRoomId: '',
  otherUserId: '',
  spaceId: '',
  otherUserName: '',
  otherUserAvatar: ''
}

const dmStore = create<DMStoreState>()((set) => ({
  ...initialState,
  openDm: (dmState: DMState) => set({ ...dmState }),
  closeDm: () => set({ ...initialState })
}))

const useDmStore = createSelectors(dmStore)
export default useDmStore
