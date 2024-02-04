import styled from 'styled-components'

import { StLine } from '@/components/spaces/SpaceListHeader'
import SpaceSearchForm from '@/components/spaces/SpaceSearchForm'

const StHeaderWrapper = styled.div``
const StSortTitleContainer = styled.div``

export default function ScrumBoardHeader() {
  return (
    <StHeaderWrapper>
      <StSortTitleContainer>
        <span>최근 순</span>
        <StLine />
        <span>이름 순</span>
      </StSortTitleContainer>
      <SpaceSearchForm />
    </StHeaderWrapper>
  )
}
