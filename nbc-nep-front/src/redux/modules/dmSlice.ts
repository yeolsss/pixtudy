import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  isOpen: boolean;
  dmRoomId: string;
  otherUserId: string;
  spaceId: string;
};

const initialState: Payload = {
  isOpen: false,
  dmRoomId: "",
  otherUserId: "",
  spaceId: "",
};
const dmSlice = createSlice({
  name: "dm",
  initialState,
  reducers: {
    isOpenDm: (state, action: PayloadAction<Payload>) => {
      state.isOpen = action.payload.isOpen;
      state.dmRoomId = action.payload.dmRoomId;
      state.otherUserId = action.payload.otherUserId;
      state.spaceId = action.payload.spaceId;
    },
    isCloseDm: (state) => {
      state.isOpen = false;
      state.dmRoomId = "";
      state.otherUserId = "";
      state.spaceId = "";
    },
  },
});

export const { isOpenDm, isCloseDm } = dmSlice.actions;
export default dmSlice.reducer;
