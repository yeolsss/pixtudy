import {
  CreateSpaceInfo,
  JoinSpaceInfo,
  UserProfile
} from '@/types/space.types'
import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'

interface SpaceState {
  createSpaceInfo: CreateSpaceInfo
  joinSpaceInfo: JoinSpaceInfo
  userProfile: UserProfile
  avatar: string
  setCreateSpaceInfo: (spaceInfo: CreateSpaceInfo) => void
  setJoinSpaceInfo: (spaceInfo: JoinSpaceInfo) => void
  setUserProfile: (userProfile: UserProfile) => void
  setAvatar: (avatar: string) => void
  resetCreateSpaceInfo: () => void
  resetJoinSpaceInfo: () => void
}

const initialState = {
  createSpaceInfo: {},
  joinSpaceInfo: {
    space_id: '',
    user_id: '',
    space_avatar: '',
    space_display_name: '',
    title: '',
    description: '',
    owner: ''
  },
  userProfile: {
    avatar: '',
    display_name: '',
    owner: ''
  },
  avatar: 'NPC1'
}

const spaceStore = create<SpaceState>()((set) => ({
  ...initialState,
  setAvatar: (avatar: string) => set({ avatar }),
  setCreateSpaceInfo: (spaceInfo: CreateSpaceInfo) =>
    set({ createSpaceInfo: spaceInfo }),
  setJoinSpaceInfo: (spaceInfo: JoinSpaceInfo) =>
    set({ joinSpaceInfo: spaceInfo }),
  setUserProfile: (userProfile: UserProfile) => set({ userProfile }),
  resetCreateSpaceInfo: () =>
    set(() => {
      return {
        createSpaceInfo: { ...initialState.createSpaceInfo },
        userProfile: { ...initialState.userProfile }
      }
    }),
  resetJoinSpaceInfo: () =>
    set(() => {
      return {
        joinSpaceInfo: { ...initialState.joinSpaceInfo },
        userProfile: { ...initialState.userProfile }
      }
    })
}))

const useSpaceStore = createSelectors(spaceStore)
export default useSpaceStore
