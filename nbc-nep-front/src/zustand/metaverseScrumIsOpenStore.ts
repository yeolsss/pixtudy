import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface MetaverseScrumIsOpenState {
  isOpen: boolean;
  openMetaverseScrum: () => void;
  closeMetaverseScrum: () => void;
}

const metaverseScrumIsOpenStore = create<MetaverseScrumIsOpenState>((set) => ({
  isOpen: false,
  openMetaverseScrum: () => set(() => ({ isOpen: true })),
  closeMetaverseScrum: () => set(() => ({ isOpen: false })),
}));

const useMetaverseScrumIsOpenStore = createSelectors(metaverseScrumIsOpenStore);
export default useMetaverseScrumIsOpenStore;
