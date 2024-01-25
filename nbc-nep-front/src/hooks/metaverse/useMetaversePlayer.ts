import { getPlayerSpaceData } from "@/api/supabase/space";
import { Player } from "@/components/metaverse/types/metaverse";
import usePlayerList from "@/zustand/metaversePlayer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "@/zustand/authStore";

const useMetaversePlayer = () => {
  const { id, display_name } = useAuth((state) => state.user);
  const { playerList, setPlayerList } = usePlayerList((state) => state);

  const router = useRouter();

  const isSpaceIdString = typeof router.query.space_id === "string";

  const spaceId = isSpaceIdString ? (router.query.space_id as string) : "";

  const { data: playerSpaceInfoData } = useQuery({
    queryKey: ["playerSpaceInfo", spaceId],
    queryFn: () => getPlayerSpaceData(spaceId),
    enabled: !!spaceId,
    staleTime: Infinity,
  });

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

  const findPlayerById = (playerId: string) => {
    return playerList.find((player) => player.playerId === playerId);
  };

  return {
    playerList,
    spaceId,
    id,
    playerSpaceInfoData,
    display_name,
    findPlayerById,
  };
};

export default useMetaversePlayer;
