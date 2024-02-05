import {
  SCRUM_BOARD_TEXT_AREA_FONT_SIZE,
  SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
} from "@/components/scrumboard/constants";
import BackDropTextArea from "@/components/scrumboard/detail/BackDropTextArea";
import CreateDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader";
import useCreateScrumFormTextArea from "@/hooks/scrumBoard/useCreateScrumFormTextArea";
import useScrumBoardItemStore from "@/zustand/scrumBoardItemStore";
import { StCreateBackDropDescriptionWrapper } from "../../styles/backdrop.styles";

export default function CreateDescription() {
  const scrumBoardText = useScrumBoardItemStore.use.scrumBoardText();
  const setScrumBoardText = useScrumBoardItemStore.use.setScrumBoardText();
  const validBoardText = useScrumBoardItemStore.use.validBoardText();
  const [text, textAreaRef, handleOnChange] = useCreateScrumFormTextArea({
    text: scrumBoardText,
    setText: setScrumBoardText,
    maxLength: SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
  });

  return (
    <StCreateBackDropDescriptionWrapper>
      <CreateDescriptionHeader text={text} countType="C" />
      <BackDropTextArea
        fontSize={SCRUM_BOARD_TEXT_AREA_FONT_SIZE}
        forwardRef={textAreaRef}
        value={text}
        handler={handleOnChange}
        validState={validBoardText}
      />
    </StCreateBackDropDescriptionWrapper>
  );
}
