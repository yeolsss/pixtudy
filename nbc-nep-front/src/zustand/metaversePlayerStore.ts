import { Player, PlayerState } from "@/components/metaverse/types/metaverse";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface PlayerListState {
  playerList: Player[];
  setPlayerList: (players: Player[]) => void;
  changePlayerState: (playerId: string, state: PlayerState) => void;
}

const playerListStore = create<PlayerListState>()((set) => ({
  playerList: [],
  setPlayerList: (players) => set(() => ({ playerList: players })),
  changePlayerState: (playerId: string, playerState: PlayerState) =>
    set((state) => ({
      playerList: state.playerList.map((prevPlayer) => {
        if (prevPlayer.playerId === playerId)
          return { ...prevPlayer, state: playerState };
        return prevPlayer;
      }),
    })),
}));

const usePlayerListStore = createSelectors(playerListStore);
export default usePlayerListStore;
