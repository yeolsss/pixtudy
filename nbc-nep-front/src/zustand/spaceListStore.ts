import { Space_members } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface SpaceListStoreState {
  spaces: Space_members[];
  filteredSpaces: Space_members[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterSpaces: () => void;
  setSpaces: (spaces: Space_members[]) => void;
}

const useSpaceSearch = create<SpaceListStoreState>()((set) => ({
  spaces: [],
  filteredSpaces: [],
  searchValue: "",
  changeSearchValue: (searchValue: string) => set(() => ({ searchValue })),
  filterSpaces: () =>
    set((state) => ({
      filteredSpaces: state.spaces.filter((space) =>
        space
          .spaces!.title.toLowerCase()
          .includes(state.searchValue.toLowerCase())
      ),
    })),
  setSpaces: (spaces: Space_members[]) =>
    set(() => ({ spaces, filteredSpaces: spaces })),
}));

interface props {
  users: Space_members[];
  filteredUsers: Space_members[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterUsers: () => void;
  setUsers: (spaces: Space_members[]) => void;
}

export default useSpaceSearch;
