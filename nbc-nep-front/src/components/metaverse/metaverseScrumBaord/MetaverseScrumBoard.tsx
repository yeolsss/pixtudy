import styledComponents from 'styled-components'

import ScrumBoard from '@/components/scrumboard/detail/ScrumBoard'
import { StVideosLayoutContainer } from '@/components/video-conference/ShareScreenContainer'
import useMetaverseScrumIsOpenStore from '@/zustand/metaverseScrumIsOpenStore'

const styled = styledComponents

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
`

export default function MetaverseScrumBoard() {
  const closeMetaverseScrum =
    useMetaverseScrumIsOpenStore.use.closeMetaverseScrum()
  const handleOnClickClose = () => {
    closeMetaverseScrum()
  }
  return (
    <StMetaverseScrumBoardWrapper>
      <button onClick={handleOnClickClose}>닫기</button>
      <ScrumBoard />
    </StMetaverseScrumBoardWrapper>
  )
}
