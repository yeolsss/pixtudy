import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useAuthStore from "@/zustand/authStore";
import useSpaceSearchStore from "@/zustand/spaceListStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SpaceCard from "./SpaceCard";
import SpaceListHeader from "./SpaceListHeader";
import { StCardListWrapper, StSpaceList } from "./styles/spaceList.styles";

interface Props {
  currentUserId: string;
  setRunState: (isRun: boolean) => void;
  showTemporaryComponent: boolean;
}

export default function SpaceList({
  currentUserId,
  setRunState,
  showTemporaryComponent,
}: Props) {
  const getUserSpaces = useGetUserSpaces(currentUserId);
  const spaces = useSpaceSearchStore.use.spaces();
  const setSpaces = useSpaceSearchStore.use.setSpaces();
  const filteredSpaces = useSpaceSearchStore.use.filteredSpaces();
  const router = useRouter();
  const user = useAuthStore.use.user();

  useEffect(() => {
    if (getUserSpaces) {
      const { query } = router.query;
      if (query === "myspace") {
        setSpaces(
          getUserSpaces.filter((space) => space.spaces?.owner === user.id)
        );
        return;
      }
      setSpaces(getUserSpaces);
      if (!getUserSpaces.length) {
        setRunState(true);
      }
    }
  }, [getUserSpaces, router.query.query]);

  useEffect(() => {
    if (showTemporaryComponent) {
      setSpaces([null]);
    } else if (spaces.length) {
      if (!spaces[0]) {
        const [, ...newSpaces] = spaces;
        setSpaces(newSpaces);
      }
    }
  }, [showTemporaryComponent]);

  return (
    <StCardListWrapper>
      <SpaceListHeader />
      <StSpaceList>
        {filteredSpaces?.map((space, index) => {
          return (
            <li key={space ? space.id : index}>
              <SpaceCard space={space || null} />
            </li>
          );
        })}
      </StSpaceList>
    </StCardListWrapper>
  );
}
