import SpaceThumb from '@/components/common/SpaceThumb'
import { StDangerButton } from '@/components/common/button/button.styles'
import useConfirm from '@/hooks/confirm/useConfirm'
import useMetaversePlayer from '@/hooks/metaverse/useMetaversePlayer'
import { useLeavingSpace } from '@/hooks/query/useSupabase'

import { StSectionMain } from '../styles/config.styles'

import ConfigSpaceOwner from './ConfigSpaceOwner'

export default function ConfigSpace() {
  const { isOwner, spaceInfo, id: currentUserId } = useMetaversePlayer()
  const { openConfirmHandler } = useConfirm()
  const { leavingSpace } = useLeavingSpace()

  const handleLeavingSpace = async () => {
    const result = await openConfirmHandler({
      title: '스페이스 나가기',
      message: '스페이스를 나가면 대시보드에서 이 스페이스는 삭제됩니다.',
      confirmButtonText: '네, 알겠습니다.',
      denyButtonText: '아니요'
    })

    if (result) {
      if (spaceInfo?.id && currentUserId) {
        leavingSpace({ spaceId: spaceInfo.id, userId: currentUserId })
      } else {
        // handle the case where spaceInfo?.id or currentUserId is undefined
      }
    }
  }

  return (
    <>
      {!isOwner ? (
        <StSectionMain>
          <div>
            <span>스페이스 썸네일</span>
            <SpaceThumb src={spaceInfo?.space_thumb || undefined} />
          </div>
          <div>
            <span>스페이스 이름</span>
            <h1>{spaceInfo?.title}</h1>
          </div>
          <div>
            <span>스페이스 설명</span>
            <p>{spaceInfo?.description}</p>
          </div>

          <StDangerButton onClick={handleLeavingSpace}>
            스페이스 나가기
          </StDangerButton>
        </StSectionMain>
      ) : (
        <ConfigSpaceOwner />
      )}
    </>
  )
}
