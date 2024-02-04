import {
  SCRUM_BOARD_TEXT_AREA_FONT_SIZE,
  SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH
} from '@/components/scrumboard/constants/constants'
import BackDropTextArea from '@/components/scrumboard/detail/BackDropTextArea'
import CreateDescriptionHeader from '@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader'
import useCreateScrumFormTextArea from '@/hooks/scrumBoard/useCreateScrumFormTextArea'
import useScrumBoardItemStore from '@/zustand/scrumBoardItemStore'
import styled from 'styled-components'

export default function CreateDescription() {
  const scrumBoardText = useScrumBoardItemStore.use.scrumBoardText()
  const setScrumBoardText = useScrumBoardItemStore.use.setScrumBoardText()
  const validBoardText = useScrumBoardItemStore.use.validBoardText()
  const [text, textAreaRef, handleOnChange] = useCreateScrumFormTextArea({
    text: scrumBoardText,
    setText: setScrumBoardText,
    maxLength: SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH
  })

  return (
    <StCreateBackDropDescriptionWrapper>
      <CreateDescriptionHeader text={text} countType={'C'} />
      <BackDropTextArea
        fontSize={SCRUM_BOARD_TEXT_AREA_FONT_SIZE}
        forwardRef={textAreaRef}
        value={text}
        handler={handleOnChange}
        validState={validBoardText}
      />
    </StCreateBackDropDescriptionWrapper>
  )
}

const StCreateBackDropDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing[8]};
`
