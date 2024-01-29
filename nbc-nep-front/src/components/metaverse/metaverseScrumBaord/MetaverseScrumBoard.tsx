import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import styled from "styled-components";
import { StVideosLayoutContainer } from "@/components/video-conference/ShareScreenContainer";
import useMetaverseScrumIsOpen from "@/zustand/metaverseScrumIsOpenStore";

export default function MetaverseScrumBoard() {
  const { closeMetaverseScrum } = useMetaverseScrumIsOpen();
  const handleOnClickClose = () => {
    closeMetaverseScrum();
  };
  return (
    <StMetaverseScrumBoardWrapper>
      <button onClick={handleOnClickClose}>닫기</button>
      <ScrumBoard />
    </StMetaverseScrumBoardWrapper>
  );
}

const StMetaverseScrumBoardWrapper = styled(StVideosLayoutContainer)`
  color: black;
  justify-content: center;
  z-index: 2000;
  > div {
    width: 100% !important;
  }
  > div > div {
    max-width: 2000px;
    padding: 20px;
  }
`;
