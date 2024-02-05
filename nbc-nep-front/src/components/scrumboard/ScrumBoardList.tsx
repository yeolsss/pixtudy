import ScrumBoardHeader from "@/components/scrumboard/ScrumBoardHeader";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useAuthStore from "@/zustand/authStore";
import styled from "styled-components";
import { StCardListWrapper } from "../spaces/SpaceList";
import ScrumBoardCard from "./ScrumBoardCard";

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

const StScrumBoardListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing[24]};
`;
