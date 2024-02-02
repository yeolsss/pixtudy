import { getPlayerSpaceData, getSpaceData } from "@/api/supabase/space";
import useAuth from "@/zustand/authStore";
import usePlayerList from "@/zustand/metaversePlayerStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useMetaversePlayer = () => {
  const { id, display_name } = useAuth((state) => state.user);
  const playerList = usePlayerList((state) => state.playerList);
  const setPlayerList = usePlayerList((state) => state.setPlayerList);

  const router = useRouter();

  const isSpaceIdString = typeof router.query.space_id === "string";

  const spaceId = isSpaceIdString ? (router.query.space_id as string) : "";

  const { data: playerSpaceInfoData } = useQuery({
    queryKey: ["playerSpaceInfo", spaceId],
    queryFn: () => getPlayerSpaceData(spaceId),
    enabled: !!spaceId,
    staleTime: Infinity,
  });

  const { data: spaceInfo } = useQuery({
    queryKey: ["spaceInfo", spaceId],
    queryFn: () => getSpaceData(spaceId),
    enabled: !!spaceId,
  });

  const findPlayerById = (playerId: string) => {
    return playerList.find((player) => player.playerId === playerId);
  };

  const isOwner = id === spaceInfo?.owner;

  const currentUserInfo = playerList.find((player) => player.playerId === id);

  return {
    playerList,
    spaceId,
    id,
    playerSpaceInfoData,
    display_name,
    findPlayerById,
    spaceInfo,
    isOwner,
    currentUserInfo,
    setPlayerList,
  };
};

export default useMetaversePlayer;
