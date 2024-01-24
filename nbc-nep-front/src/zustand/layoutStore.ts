import { create } from "zustand";

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

export default layoutStore;
