import { Player } from "@/types/metaverse";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useCustomQuery } from "@/hooks/tanstackQuery/useCustomQuery";
import { Tables } from "@/types/supabase";
import { getPlayerSpaceData } from "@/api/supabase/space";
import { useAppSelector } from "@/hooks/useReduxTK";

type PlayerContextType = {
  playerList: Player[];
  spaceId: string;
  id: string;
  playerSpaceInfoData: Tables<"space_members"> | undefined;
  display_name: string | null;
};

const initialState: PlayerContextType = {
  playerList: [] as Player[],
  spaceId: "",
  id: "",
  playerSpaceInfoData: {} as Tables<"space_members">,
  display_name: "",
};

const PlayerContext = createContext<PlayerContextType>(initialState);
export const MetaversePlayerProvider = ({ children }: PropsWithChildren) => {
  const { id, display_name } = useAppSelector((state) => state.authSlice.user);
  const [playerList, setPlayerList] = useState<Player[]>([]);

  const router = useRouter();
  const spaceId =
    typeof router.query.space_id === "string" ? router.query.space_id : "";
  // user 정보를 가져와서 spaceId에 해당하는 정보 가져오기
  const playerSpaceInfoOptions = {
    queryKey: ["playerSpaceInfo", spaceId],
    queryFn: () => getPlayerSpaceData(spaceId),
    queryOptions: {
      enabled: !!spaceId,
      staleTime: Infinity,
    },
  };
  const playerSpaceInfoData = useCustomQuery<Tables<"space_members">, Error>(
    playerSpaceInfoOptions
  );

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
    id,
    playerSpaceInfoData,
    display_name,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
