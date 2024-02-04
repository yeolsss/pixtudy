import { Space_members } from '@/types/supabase.tables.types'
import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'

interface SpaceListStoreState {
  spaceMembers: Space_members[]
  filteredSpaceMembers: Space_members[]
  assignees: Space_members[]
  searchValue: string
  backDropIsOpen: boolean
  changeSearchValue: (searchValue: string) => void
  filterSpaceMembers: () => void
  setSpaceMembers: (spaceMembers: Space_members[]) => void
  setBackDropIsOpen: (isOpen: boolean) => void
  setAssignees: (assign: Space_members) => void
  deleteAssignees: (userId: string) => void
  resetAssignees: () => void
  resetBackDrop: () => void
}

const scrumBoardMemberSearchStore = create<SpaceListStoreState>()((set) => ({
  spaceMembers: [],
  filteredSpaceMembers: [],
  searchValue: '',
  assignees: [],
  backDropIsOpen: false,
  changeSearchValue: (searchValue: string) => set(() => ({ searchValue })),
  filterSpaceMembers: () =>
    set((state) => ({
      filteredSpaceMembers: state.spaceMembers.filter(
        (spaceMember) =>
          !state.assignees.find(
            (assignee) => assignee.users?.id === spaceMember.users?.id
          ) &&
          (spaceMember.users?.email
            .toLowerCase()
            .includes(state.searchValue.toLowerCase()) ||
            spaceMember.space_display_name
              .toLowerCase()
              .includes(state.searchValue.toLowerCase()))
      )
    })),
  setAssignees: (assign: Space_members) =>
    set((state) => ({ assignees: [...state.assignees, assign] })),
  deleteAssignees: (userId: string) =>
    set((state) => ({
      assignees: state.assignees.filter((assign) => assign.user_id !== userId)
    })),
  setBackDropIsOpen: (isOpen: boolean) =>
    set(() => ({ backDropIsOpen: isOpen })),
  setSpaceMembers: (spaceMembers: Space_members[]) =>
    set(() => ({ spaceMembers, filteredSpaceMembers: spaceMembers })),
  resetAssignees: () => set(() => ({ assignees: [] })),
  resetBackDrop: () =>
    set((state) => ({
      assignees: [],
      filteredSpaceMembers: [...state.spaceMembers],
      backDropIsOpen: false
    }))
}))

const useScrumBoardMemberSearchStore = createSelectors(
  scrumBoardMemberSearchStore
)
export default useScrumBoardMemberSearchStore
