import { Player } from "@/types/metaverse";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type PlayerContextType = {
  playerList: Player[];
};

const initialState: PlayerContextType = {
  playerList: [] as Player[],
};

const PlayerContext = createContext<PlayerContextType>(initialState);
export const MetaversePlayerProvider = ({ children }: PropsWithChildren) => {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  useEffect(() => {
    const handlePlayerList = (event: Event) => {
      const customEvent = event as CustomEvent;
      const players = Object.values(customEvent.detail) as Player[];
      setPlayerList(players);
    };

    window.addEventListener("metaversePlayerList", handlePlayerList);

    return () => {
      window.removeEventListener("metaversePlayerList", handlePlayerList);
    };
  }, []);

  const value = {
    playerList,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);