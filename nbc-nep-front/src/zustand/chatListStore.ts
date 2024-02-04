import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'
import { Chat } from '@/types/metaverse.types'

type ChatListStore = {
  chatList: Chat[]
  setChatList: (chat: Chat) => void
}
const chatListStore = create<ChatListStore>((set) => ({
  chatList: [],
  setChatList: (chat: Chat) =>
    set((state) => ({ chatList: [...state.chatList, chat] }))
}))

const useChatListStore = createSelectors(chatListStore)
export default useChatListStore
