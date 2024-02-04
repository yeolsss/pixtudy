import CreateCategoryInputBox from '@/components/scrumboard/detail/createBackDrop/CreateCategoryInputBox'
import styled from 'styled-components'

export default function CreateInput() {
  return (
    <StCreateInputBackDropWrapper>
      <CreateCategoryInputBox />
    </StCreateInputBackDropWrapper>
  )
}

const StCreateInputBackDropWrapper = styled.div`
  position: relative;
  width: 275px;
  padding: ${(props) => props.theme.spacing[4]};
`
