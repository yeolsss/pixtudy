import { Space_members } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface SpaceListStoreState {
  spaces: (Space_members | null)[];
  filteredSpaces: (Space_members | null)[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterSpaces: () => void;
  setSpaces: (spaces: (Space_members | null)[]) => void;
}

const spaceSearchStore = create<SpaceListStoreState>()((set) => ({
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

const useSpaceSearchStore = createSelectors(spaceSearchStore);
export default useSpaceSearchStore;
