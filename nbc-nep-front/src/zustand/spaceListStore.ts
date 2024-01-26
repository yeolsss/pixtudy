import { Space_members } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface SpaceListStoreState {
  spaces: (Space_members | null)[];
  filteredSpaces: (Space_members | null)[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterSpaces: () => void;
  setSpaces: (spaces: (Space_members | null)[]) => void;
}

const useSpaceSearch = create<SpaceListStoreState>()((set) => ({
  spaces: [],
  filteredSpaces: [],
  searchValue: "",
  changeSearchValue: (searchValue: string) => set(() => ({ searchValue })),
  filterSpaces: () =>
    set((state) => ({
      filteredSpaces: state.spaces.filter((space) => {
        if (space) {
          return space
            .spaces!.title.toLowerCase()
            .includes(state.searchValue.toLowerCase());
        }
      }),
    })),
  setSpaces: (spaces: (Space_members | null)[]) =>
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
