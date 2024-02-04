import { create } from "zustand";
import { Chat } from "@/components/metaverse/types/metaverse";
import createSelectors from "@/zustand/config/createSelector";

type ChatListStore = {
  chatList: Chat[];
  setChatList: (chat: Chat) => void;
};
const chatListStore = create<ChatListStore>((set) => ({
  chatList: [],
  setChatList: (chat: Chat) =>
    set((state) => ({ chatList: [...state.chatList, chat] })),
}));

const useChatListStore = createSelectors(chatListStore);
export default useChatListStore;
