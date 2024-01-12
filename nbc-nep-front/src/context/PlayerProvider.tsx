import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player } from "@/types/metaverse";

type PlayerContextType = {
  player: Player | undefined;
  setPlayer: Dispatch<SetStateAction<Player | undefined>>;
  updatePlayer: (player: Player) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export const PlayerProvider = ({ children }: PropsWithChildren) => {
  const [player, setPlayer] = useState<Player>();

  const updatePlayer = (player: Player) => {
    setPlayer(player);
  };

  useEffect(() => {
    const handlePlayerMovement = (event: Event) => {
      const customEvent = event as CustomEvent;
      updatePlayer(customEvent.detail);
    };

    window.addEventListener("playerMovement", handlePlayerMovement);

    return () => {
      window.removeEventListener("playerMovement", handlePlayerMovement);
    };
  }, []);

  console.log(player);

  const value = {
    player,
    setPlayer,
    updatePlayer,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
