import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MetaversePayload = {
  x: number;
  y: number;
};

const initialState = {
  metaverse: {
    x: 0,
    y: 0,
  },
};

const metaverseSlice = createSlice({
  name: "metaverse",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<MetaversePayload>) => {
      state.metaverse = action.payload;
    },
  },
});

export const { setPosition } = metaverseSlice.actions;
export default metaverseSlice.reducer;
