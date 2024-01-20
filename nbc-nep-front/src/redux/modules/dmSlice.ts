import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  isOpen: boolean;
  dmRoomId: string;
  otherUserId: string;
  spaceId: string;
  otherUserName: string;
  otherUserAvatar: string;
};

const initialState: Payload = {
  isOpen: false,
  dmRoomId: "",
  otherUserId: "",
  spaceId: "",
  otherUserName: "",
  otherUserAvatar: "",
};
const dmSlice = createSlice({
  name: "dm",
  initialState,
  reducers: {
    setIsOpenDm: (state, action: PayloadAction<Payload>) => {
      state.isOpen = action.payload.isOpen;
      state.dmRoomId = action.payload.dmRoomId;
      state.otherUserId = action.payload.otherUserId;
      state.spaceId = action.payload.spaceId;
      state.otherUserName = action.payload.otherUserName;
      state.otherUserAvatar = action.payload.otherUserAvatar;
    },
    setCloseDm: (state) => {
      state.isOpen = false;
      state.dmRoomId = "";
      state.otherUserId = "";
      state.spaceId = "";
      state.otherUserName = "";
      state.otherUserAvatar = "";
    },
  },
});

export const { setIsOpenDm, setCloseDm } = dmSlice.actions;
export default dmSlice.reducer;
