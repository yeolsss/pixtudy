import { create } from "zustand";
import { Chat } from "@/components/metaverse/types/metaverse";

type ChatListStore = {
  chatList: Chat[];
  setChatList: (chat: Chat) => void;
};
const useChatListStore = create<ChatListStore>((set) => ({
  chatList: [],
  setChatList: (chat: Chat) =>
    set((state) => ({ chatList: [...state.chatList, chat] })),
}));

export default useChatListStore;
