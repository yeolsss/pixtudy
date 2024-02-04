import { splitVideoSource } from '@/components/video-conference/libs/util'
import { LayoutConsumersType } from '@/types/conference.types'
import useConferenceStore from '@/zustand/conferenceStore'
import useLayoutStore from '@/zustand/layoutStore'
import { useEffect, useState } from 'react'

export default function useLayout() {
  const consumers = useConferenceStore.use.consumers()

  const layoutPlayerId = useLayoutStore.use.layoutPlayerId()
  const layoutClose = useLayoutStore.use.layoutClose()
  const layoutPlayerNickName = useLayoutStore.use.layoutPlayerNickName()
  const layoutOpen = useLayoutStore.use.layoutOpen()
  const isOpen = useLayoutStore.use.isOpen()

  const [videos, setVideos] = useState<LayoutConsumersType[]>([])

  useEffect(() => {
    const filteredConsumers = consumers.filter(
      (consumer) => consumer.appData.playerId === layoutPlayerId
    )
    const [_, screenConsumers] = splitVideoSource(filteredConsumers)

    const newConsumers = screenConsumers.map((consumer) => {
      const prevVideo = videos.find(
        (video) => video.consumer.id === consumer.id
      )
      // 새로운 비디오
      if (!prevVideo) return { consumer, isActive: 0 }
      // 기존 비디오
      return prevVideo
    })
    setVideos(newConsumers)
  }, [consumers, layoutPlayerId])

  // 현재 active 상태인 영상 개수
  const countSelectVideos = videos.reduce((acc, val) => {
    if (!!val.isActive) return acc + 1
    else return acc
  }, 0)

  const handleInactive = (id: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.consumer.id === id ? { ...video, isActive: 0 } : video
      )
    )
  }

  const videosChange = (newVideos: LayoutConsumersType[]) => {
    setVideos(newVideos)
  }

  const handleCloseLayout = () => {
    layoutClose()
  }

  const handleOpenLayout = ({
    playerId,
    playerNickName
  }: {
    playerId: string
    playerNickName: string
  }) => {
    layoutOpen({ playerId, playerNickName })
  }

  return {
    videos,
    countSelectVideos,
    layoutPlayerNickName,
    isOpen,
    handleInactive,
    videosChange,
    handleCloseLayout,
    handleOpenLayout
  }
}
