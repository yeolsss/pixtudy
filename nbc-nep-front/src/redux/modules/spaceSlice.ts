import {
  CreateSpaceInfo,
  JoinSpaceInfo,
  UserProfile,
} from "@/components/spaces/types/space.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SpaceState {
  createSpaceInfo: CreateSpaceInfo;
  joinSpaceInfo: JoinSpaceInfo;
  userProfile: UserProfile;
}

const initialState: SpaceState = {
  createSpaceInfo: {},
  joinSpaceInfo: {
    space_id: "",
    user_id: "",
    space_avatar: "",
    space_display_name: "",
    title: "",
    description: "",
    owner: "",
  },
  userProfile: {
    avatar: "",
    display_name: "",
  },
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setCreateSpaceInfo: (state, action: PayloadAction<CreateSpaceInfo>) => {
      state.createSpaceInfo = action.payload;
    },
    setJoinSpaceInfo: (state, action: PayloadAction<JoinSpaceInfo>) => {
      state.joinSpaceInfo = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    resetCreateSpaceInfo: (state) => {
      state.createSpaceInfo = initialState.createSpaceInfo;
      state.userProfile = initialState.userProfile;
    },
    resetJoinSpaceInfo: (state) => {
      state.joinSpaceInfo = initialState.joinSpaceInfo;
      state.userProfile = initialState.userProfile;
    },
  },
});

export const {
  setCreateSpaceInfo,
  setJoinSpaceInfo,
  setUserProfile,
  resetCreateSpaceInfo,
  resetJoinSpaceInfo,
} = spaceSlice.actions;
export default spaceSlice.reducer;
