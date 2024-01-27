import styled from "styled-components";
import CreateDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader";
import BackDropTextArea from "@/components/scrumboard/detail/BackDropTextArea";
import useCreateScrumFormTextArea from "@/hooks/scrumBoard/useCreateScrumFormTextArea";
import useScrumBoardItem from "@/zustand/scrumBoardItemStore";
import {
  SCRUM_BOARD_TEXT_AREA_FONT_SIZE,
  SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
} from "@/components/scrumboard/constants/constants";

export default function CreateDescription() {
  // update 할때 고려해볼려고
  const { scrumBoardText, setScrumBoardText, validBoardText } =
    useScrumBoardItem();
  const [text, textAreaRef, handleOnChange] = useCreateScrumFormTextArea({
    text: scrumBoardText,
    setText: setScrumBoardText,
    maxLength: SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
  });

  return (
    <StCreateBackDropDescriptionWrapper>
      <CreateDescriptionHeader text={text} />
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

const StCreateBackDropDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing[8]};
`;
