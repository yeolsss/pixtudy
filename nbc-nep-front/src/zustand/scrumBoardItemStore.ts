import { create } from "zustand";
import { Assign } from "@/components/scrumboard/types/scrumTypes";

interface ScrumBoardItemState {
  scrumBoardText: string;
  assignees: Assign[];
}
interface ScrumBoardItemStoreState extends ScrumBoardItemState {
  setScrumBoardText: (scrumBoardText: string) => void;
  setAssignees: (assignees: Assign[]) => void;
  resetScrumBoardItem: () => void;
}

const initialState: ScrumBoardItemState = {
  scrumBoardText: "",
  assignees: [],
};

const useScrumBoardItem = create<ScrumBoardItemStoreState>()((set) => ({
  ...initialState,
  setScrumBoardText: (scrumBoardText: string) => set({ scrumBoardText }),
  setAssignees: (assignees: Assign[]) => set({ assignees }),
  resetScrumBoardItem: () =>
    set(() => {
      return {
        scrumBoardText: "",
        assignees: [],
      };
    }),
}));

export default useScrumBoardItem;
