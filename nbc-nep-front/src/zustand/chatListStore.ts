import { create } from "zustand";
import { Chat } from "@/components/metaverse/types/metaverse";
import createSelector from "@/zustand/config/createSelector";

type ChatListStore = {
  chatList: Chat[];
  setChatList: (chat: Chat) => void;
};
const useChatListStoreBase = create<ChatListStore>((set) => ({
  chatList: [],
  setChatList: (chat: Chat) =>
    set((state) => ({ chatList: [...state.chatList, chat] })),
}));

const useChatListStore = createSelector(useChatListStoreBase);
export default useChatListStore;
