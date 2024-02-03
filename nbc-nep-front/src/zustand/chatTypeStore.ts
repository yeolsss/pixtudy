import { ChatType } from "@/components/metaverse/types/ChatType";
import { create } from "zustand";
import createSelector from "@/zustand/config/createSelector";

interface ChatTypeState {
  isOpenChat: boolean;
  chatType: ChatType;
}

interface ChatTypeStoreState extends ChatTypeState {
  openChat: (chatType: ChatType) => void;
  closeChat: () => void;
}

const initialState: ChatTypeState = {
  isOpenChat: false,
  chatType: "GLOBAL",
};

const chatType = create<ChatTypeStoreState>()((set) => ({
  ...initialState,
  closeChat: () => set(() => ({ ...initialState })),
  openChat: (chatType: ChatType) =>
    set(() => ({
      isOpenChat: true,
      chatType,
    })),
}));

const useChatTypeStore = createSelector(chatType);
export default useChatTypeStore;
