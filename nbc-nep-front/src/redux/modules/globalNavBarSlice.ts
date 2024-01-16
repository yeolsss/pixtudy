import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  chatSection: boolean;
  settingsSection: boolean;
  playerList: boolean;
};

const initialState = {
  chatSection: false,
  settingsSection: false,
  playerList: false,
};

const globalNavBarSlice = createSlice({
  name: "globalNavBar",
  initialState,
  reducers: {
    setIsSomeSection: (state, action: PayloadAction<Payload>) => {
      state.chatSection = action.payload.chatSection;
      state.settingsSection = action.payload.settingsSection;
      state.playerList = action.payload.playerList;
      console.log(action.payload.playerList);
    },
  },
});

export const { setIsSomeSection } = globalNavBarSlice.actions;
export default globalNavBarSlice.reducer;
