import { create } from "zustand";
import createSelector from "@/zustand/config/createSelector";
import { ChatType } from "@/types/metaverse.types";

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
  openChat: (type: ChatType) =>
    set(() => ({
      isOpenChat: true,
      chatType: type,
    })),
}));

const useChatTypeStore = createSelector(chatType);
export default useChatTypeStore;
