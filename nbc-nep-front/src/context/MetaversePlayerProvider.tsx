import { Player } from "@/types/metaverse";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PlayerContextType = {
  playerList: Player[];
  spaceId: string;
  setSpaceId: Dispatch<SetStateAction<string>>;
};

const initialState: PlayerContextType = {
  playerList: [] as Player[],
  spaceId: "",
  setSpaceId: () => {},
};

const PlayerContext = createContext<PlayerContextType>(initialState);
export const MetaversePlayerProvider = ({ children }: PropsWithChildren) => {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [spaceId, setSpaceId] = useState<string>("");

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
    spaceId,
    setSpaceId,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
