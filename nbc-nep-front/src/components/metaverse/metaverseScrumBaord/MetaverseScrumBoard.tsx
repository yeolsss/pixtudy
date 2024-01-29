import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import styled from "styled-components";
import { StVideosLayoutContainer } from "@/components/video-conference/ShareScreenContainer";

export default function MetaverseScrumBoard() {
  return (
    <StMetaverseScrumBoardWrapper>
      <ScrumBoard />
    </StMetaverseScrumBoardWrapper>
  );
}

const StMetaverseScrumBoardWrapper = styled(StVideosLayoutContainer)`
  color: black;
  justify-content: center;
  z-index: 2000;
`;
