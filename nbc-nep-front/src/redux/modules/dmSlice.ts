import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  isOpen: boolean;
  dmRoomId: string;
};

const initialState: Payload = {
  isOpen: false,
  dmRoomId: "",
};
const dmSlice = createSlice({
  name: "dm",
  initialState,
  reducers: {
    isOpenDm: (state, action: PayloadAction<Payload>) => {
      state.isOpen = action.payload.isOpen;
      state.dmRoomId = action.payload.dmRoomId;
    },
    isCloseDm: (state) => {
      state.isOpen = false;
      state.dmRoomId = "";
    },
  },
});

export const { isOpenDm, isCloseDm } = dmSlice.actions;
export default dmSlice.reducer;
