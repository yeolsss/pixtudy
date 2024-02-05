import { SpaceMembers } from "@/types/supabase.tables.types";
import { useRouter } from "next/router";
import { StContentsContainer } from "../spaces/JoinSpaceForm";
import {
  StCardWrapper,
  StScrumBoardOpenButtonContainer,
} from "./styles/scrumBoardCard.styles";

interface Props {
  space: SpaceMembers;
}

export default function ScrumBoardCard({ space }: Props) {
  const router = useRouter();

  const handleScrumBoardClick = async () => {
    await router.push(`/boards/scrumboards/${space.spaces?.id}`);
  };

  return (
    <StCardWrapper>
      <StContentsContainer>
        <h1>{space.spaces?.title}</h1>
        <p>{space.spaces?.description}</p>
      </StContentsContainer>
      <StScrumBoardOpenButtonContainer>
        <button type="button" onClick={handleScrumBoardClick}>
          열기
        </button>
      </StScrumBoardOpenButtonContainer>
    </StCardWrapper>
  );
}
