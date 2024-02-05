import ScrumBoard from "@/components/scrumboard/detail/ScrumBoard";
import useMetaverseScrumIsOpenStore from "@/zustand/metaverseScrumIsOpenStore";
import { StMetaverseScrumBoardWrapper } from "@/components/metaverse/styles/metaverse.styles";

export default function MetaverseScrumBoard() {
  const closeMetaverseScrum =
    useMetaverseScrumIsOpenStore.use.closeMetaverseScrum();
  const handleOnClickClose = () => {
    closeMetaverseScrum();
  };
  return (
    <StMetaverseScrumBoardWrapper>
      <button type="button" onClick={handleOnClickClose}>
        닫기
      </button>
      <ScrumBoard />
    </StMetaverseScrumBoardWrapper>
  );
}
