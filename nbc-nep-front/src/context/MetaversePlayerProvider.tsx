import { Player } from "@/types/metaverse";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

type PlayerContextType = {
  playerList: Player[];
  spaceId: string;
};

const initialState: PlayerContextType = {
  playerList: [] as Player[],
  spaceId: "",
};

const PlayerContext = createContext<PlayerContextType>(initialState);
export const MetaversePlayerProvider = ({ children }: PropsWithChildren) => {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  const router = useRouter();
  const spaceId =
    typeof router.query.space_id === "string" ? router.query.space_id : "";

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
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
