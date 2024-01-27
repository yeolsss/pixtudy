import { create } from "zustand";

interface ScrumBoardItemState {
  scrumBoardText: string;
  validBoardText: boolean;
}
interface ScrumBoardItemStoreState extends ScrumBoardItemState {
  setScrumBoardText: (scrumBoardText: string) => void;
  setValidBoardText: (validBoardText: boolean) => void;
  resetScrumBoardItem: () => void;
}

const initialState: ScrumBoardItemState = {
  scrumBoardText: "",
  validBoardText: false,
};

const useScrumBoardItem = create<ScrumBoardItemStoreState>()((set) => ({
  ...initialState,
  setScrumBoardText: (scrumBoardText: string) => set({ scrumBoardText }),
  setValidBoardText: (validBoardText: boolean) => set({ validBoardText }),
  resetScrumBoardItem: () =>
    set(() => {
      return {
        scrumBoardText: "",
        validBoardText: false,
      };
    }),
}));

export default useScrumBoardItem;
