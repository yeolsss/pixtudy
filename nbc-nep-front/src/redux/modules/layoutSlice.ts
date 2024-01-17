import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  isOpen: boolean;
  layoutVideos: JSX.Element[];
  activeLayoutVideos: (JSX.Element | null)[];
}

const initialState: LayoutState = {
  isOpen: false,
  layoutVideos: [],
  activeLayoutVideos: [],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    layoutOpen: (state, action: PayloadAction<JSX.Element[]>) => {
      state.isOpen = true;
      state.layoutVideos = action.payload;
    },
    layoutClose: () => {
      return initialState;
    },
    setInActiveVideos: (state, action: PayloadAction<JSX.Element[]>) => {
      state.layoutVideos = action.payload;
    },
    setActiveVideos: (state, action: PayloadAction<(JSX.Element | null)[]>) => {
      state.activeLayoutVideos = action.payload;
    },
  },
});

export const { layoutOpen, layoutClose, setInActiveVideos, setActiveVideos } =
  layoutSlice.actions;
export default layoutSlice.reducer;
