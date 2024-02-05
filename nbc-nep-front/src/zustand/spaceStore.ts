import { CreateSpaceInfo, UserProfile } from "@/types/space.types";
import { Spaces } from "@/types/supabase.tables.types";
import createSelectors from "@/zustand/config/createSelector";
import { create } from "zustand";

interface SpaceState {
  createSpaceInfo: CreateSpaceInfo;
  joinSpaceInfo: Spaces;
  userProfile: UserProfile;
  avatar: string;
  setCreateSpaceInfo: (spaceInfo: CreateSpaceInfo) => void;
  setJoinSpaceInfo: (spaceInfo: Spaces) => void;
  setUserProfile: (userProfile: UserProfile) => void;
  setAvatar: (avatar: string) => void;
  resetCreateSpaceInfo: () => void;
  resetJoinSpaceInfo: () => void;
}

const initialState = {
  createSpaceInfo: {},
  joinSpaceInfo: {
    created_at: "",
    id: "",
    title: "",
    description: "",
    owner: "",
    space_thumb: null,
  },
  userProfile: {
    avatar: "",
    display_name: "",
    owner: "",
  },
  avatar: "NPC1",
};

const spaceStore = create<SpaceState>()((set) => ({
  ...initialState,
  setAvatar: (avatar: string) => set({ avatar }),
  setCreateSpaceInfo: (spaceInfo: CreateSpaceInfo) =>
    set({ createSpaceInfo: spaceInfo }),
  setJoinSpaceInfo: (spaceInfo: Spaces) => set({ joinSpaceInfo: spaceInfo }),
  setUserProfile: (userProfile: UserProfile) => set({ userProfile }),
  resetCreateSpaceInfo: () =>
    set(() => {
      return {
        createSpaceInfo: { ...initialState.createSpaceInfo },
        userProfile: { ...initialState.userProfile },
      };
    }),
  resetJoinSpaceInfo: () =>
    set(() => {
      return {
        joinSpaceInfo: { ...initialState.joinSpaceInfo },
        userProfile: { ...initialState.userProfile },
      };
    }),
}));

const useSpaceStore = createSelectors(spaceStore);
export default useSpaceStore;
