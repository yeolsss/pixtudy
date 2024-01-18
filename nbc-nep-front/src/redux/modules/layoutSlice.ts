import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  isOpen: boolean;
  layoutPlayerId: string;
  layoutPlayerNickName: string;
}

const initialState: LayoutState = {
  isOpen: false,
  layoutPlayerId: "",
  layoutPlayerNickName: "",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    layoutOpen: (
      state,
      action: PayloadAction<{
        playerId: string;
        playerNickName: string;
      }>
    ) => {
      state.isOpen = true;
      state.layoutPlayerId = action.payload.playerId;
      state.layoutPlayerNickName = action.payload.playerNickName;
    },
    layoutClose: () => {
      return initialState;
    },
  },
});

export const { layoutOpen, layoutClose } = layoutSlice.actions;
export default layoutSlice.reducer;
