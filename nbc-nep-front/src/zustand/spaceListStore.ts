import { SpaceMembers } from "@/types/supabase.tables.types";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface SpaceListStoreState {
  spaces: (SpaceMembers | null)[];
  filteredSpaces: (SpaceMembers | null)[];
  searchValue: string;
  changeSearchValue: (searchValue: string) => void;
  filterSpaces: () => void;
  setSpaces: (spaces: (SpaceMembers | null)[]) => void;
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
        return false;
      }),
    })),
  setSpaces: (spaces: (SpaceMembers | null)[]) =>
    set(() => ({ spaces, filteredSpaces: spaces })),
}));

const useSpaceSearchStore = createSelectors(spaceSearchStore);
export default useSpaceSearchStore;
