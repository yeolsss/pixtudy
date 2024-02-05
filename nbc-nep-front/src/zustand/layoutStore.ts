import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface LayoutState {
  isOpen: boolean;
  layoutPlayerId: string;
  layoutPlayerNickName: string;
  layoutOpen: ({
    playerId,
    playerNickName,
  }: {
    playerId: string;
    playerNickName: string;
  }) => void;
  layoutClose: () => void;
}

const initialLayoutState = {
  isOpen: false,
  layoutPlayerId: "",
  layoutPlayerNickName: "",
};

const layoutStore = create<LayoutState>()((set) => ({
  ...initialLayoutState,
  layoutOpen: ({ playerId, playerNickName }) =>
    set(() => ({
      isOpen: true,
      layoutPlayerId: playerId,
      layoutPlayerNickName: playerNickName,
    })),
  layoutClose: () => set(() => ({ ...initialLayoutState })),
}));

const useLayoutStore = createSelectors(layoutStore);
export default useLayoutStore;
