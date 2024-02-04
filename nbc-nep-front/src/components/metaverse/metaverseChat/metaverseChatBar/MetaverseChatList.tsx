import MetaverseChatCard from '@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatCard'
import MetaverseChatHeader from '@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader'
import useChatAlarm from '@/hooks/GNB/useChatAlarm'
import useEndOfChat from '@/hooks/metaverse/useEndOfChat'
import useChatTypeStore from '@/zustand/chatTypeStore'
import useDmStore from '@/zustand/dmStore'
import useGlobalNavBarStore from '@/zustand/globalNavBarStore'
import { useEffect } from 'react'
import styled from 'styled-components'
import useChatListStore from '@/zustand/chatListStore'

export default function MetaverseChatList() {
  const { handleSetGlobalChatAlarmState } = useChatAlarm()
  const isOpenChat = useChatTypeStore.use.isOpenChat()
  const chatType = useChatTypeStore.use.chatType()
  const closeChat = useChatTypeStore.use.closeChat()
  const resetAllSections = useGlobalNavBarStore.use.resetAllSections()
  const closeDm = useDmStore.use.closeDm()
  const chatList = useChatListStore.use.chatList()
  const endOfChatsRef = useEndOfChat([chatList])

  const handleOnClickCloseChat = () => {
    resetAllSections()
    closeDm()
    closeChat()
  }

  useEffect(() => {
    if (isOpenChat && chatType === 'GLOBAL')
      handleSetGlobalChatAlarmState(false)
    return () => {
      if (isOpenChat && chatType === 'GLOBAL')
        handleSetGlobalChatAlarmState(false)
    }
  }, [isOpenChat, chatList])

  return (
    <StMetaverseChatList>
      <MetaverseChatHeader
        title={'Space Chat'}
        handler={handleOnClickCloseChat}
      />
      <div>
        {chatList?.map((chat, index) => {
          return (
            <MetaverseChatCard
              chat={chat}
              key={chat.userId + index}
              type="GLOBAL"
            />
          )
        })}
        <div ref={endOfChatsRef}></div>
      </div>
    </StMetaverseChatList>
  )
}

const StMetaverseChatList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 10;
  height: 95%;

  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;

  > div:last-child {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
