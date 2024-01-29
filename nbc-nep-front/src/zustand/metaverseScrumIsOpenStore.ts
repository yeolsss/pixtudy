import { create } from "zustand";

interface MetaverseScrumIsOpenState {
  isOpen: boolean;
  openMetaverseScrum: () => void;
  closeMetaverseScrum: () => void;
}

const useMetaverseScrumIsOpen = create<MetaverseScrumIsOpenState>((set) => ({
  isOpen: false,
  openMetaverseScrum: () => set(() => ({ isOpen: true })),
  closeMetaverseScrum: () => set(() => ({ isOpen: false })),
}));

export default useMetaverseScrumIsOpen;
