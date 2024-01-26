import styled from "styled-components";
import CreateBackDropDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateBackDropDescriptionHeader";
import BackDropTextArea from "@/components/scrumboard/detail/BackDropTextArea";
import useCreateScrumFormTextArea from "@/hooks/scrumBoard/useCreateScrumFormTextArea";
import useScrumBoardItem from "@/zustand/scrumBoardItemStore";
import {
  SCRUM_BOARD_TEXT_AREA_FONT_SIZE,
  SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
} from "@/components/scrumboard/constants/constants";

export default function CreateBackDropDescription() {
  const { scrumBoardText, setScrumBoardText } = useScrumBoardItem();
  const [text, textAreaRef, handleOnChange] = useCreateScrumFormTextArea({
    text: scrumBoardText,
    setText: setScrumBoardText,
    maxLength: SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH,
  });

  return (
    <StCreateBackDropDescriptionWrapper>
      <CreateBackDropDescriptionHeader text={text} />
      <BackDropTextArea
        fontSize={SCRUM_BOARD_TEXT_AREA_FONT_SIZE}
        forwardRef={textAreaRef}
        value={text}
        handler={handleOnChange}
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
