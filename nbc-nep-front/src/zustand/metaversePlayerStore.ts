import { Player } from "@/components/metaverse/types/metaverse";
import { create } from "zustand";

interface PlayerListState {
  playerList: Player[];
  setPlayerList: (players: Player[]) => void;
}

const usePlayerList = create<PlayerListState>()((set) => ({
  playerList: [],
  setPlayerList: (players) => set(() => ({ playerList: players })),
}));

export default usePlayerList;
