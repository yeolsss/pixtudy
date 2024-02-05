import ScrumBoardHeader from "@/components/scrumboard/ScrumBoardHeader";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useAuthStore from "@/zustand/authStore";
import { StCardListWrapper } from "@/components/spaces/styles/spaceList.styles";
import ScrumBoardCard from "./ScrumBoardCard";
import { StScrumBoardListWrapper } from "./styles/scrumBoardList.styles";

export default function ScrumBoardList() {
  const user = useAuthStore.use.user();
  const userSpaces = useGetUserSpaces(user.id);
  return (
    <StCardListWrapper>
      <ScrumBoardHeader />
      <StScrumBoardListWrapper>
        {userSpaces?.map((space) => (
          <ScrumBoardCard key={space.id} space={space} />
        ))}
      </StScrumBoardListWrapper>
    </StCardListWrapper>
  );
}
