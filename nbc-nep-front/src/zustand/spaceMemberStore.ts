import { Space_members } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface SpaceListStoreState {
  spaceMembers: Space_members[];
  filteredSpaceMembers: Space_members[];
  assignees: Space_members[];
  searchValue: string;
  backDropIsOpen: boolean;
  changeSearchValue: (searchValue: string) => void;
  filterSpaceMembers: () => void;
  setSpaceMembers: (spaceMembers: Space_members[]) => void;
  setBackDropIsOpen: (isOpen: boolean) => void;
  setAssignees: (assign: Space_members) => void;
  deleteAssignees: (userId: string) => void;
  resetBackDrop: () => void;
}

const useSpaceMemberSearch = create<SpaceListStoreState>()((set) => ({
  spaceMembers: [],
  filteredSpaceMembers: [],
  searchValue: "",
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
      ),
    })),
  setAssignees: (assign: Space_members) =>
    set((state) => ({ assignees: [...state.assignees, assign] })),
  deleteAssignees: (userId: string) =>
    set((state) => ({
      assignees: state.assignees.filter(
        (assign) => assign.users?.id !== userId
      ),
    })),
  setBackDropIsOpen: (isOpen: boolean) =>
    set(() => ({ backDropIsOpen: isOpen })),
  setSpaceMembers: (spaceMembers: Space_members[]) =>
    set(() => ({ spaceMembers, filteredSpaceMembers: spaceMembers })),
  resetBackDrop: () =>
    set((state) => ({
      assignees: [],
      filteredSpaceMembers: [...state.spaceMembers],
    })),
}));

interface props {
  users: Space_members[];
  filteredUsers: Space_members[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterUsers: () => void;
  setUsers: (spaces: Space_members[]) => void;
}

export default useSpaceMemberSearch;
