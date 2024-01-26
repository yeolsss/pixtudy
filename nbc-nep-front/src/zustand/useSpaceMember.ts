import { Space_members } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface SpaceMemberStore {
  spaceMember: Space_members[];
}

interface SpaceMemberStoreActions extends SpaceMemberStore {
  setSpaceMember: (spaceMember: Space_members[]) => void;
}

const initialState: SpaceMemberStore = {
  spaceMember: [],
};

const useSpaceMember = create<SpaceMemberStoreActions>()((set) => ({
  ...initialState,
  setSpaceMember: (spaceMember: Space_members[]) => set({ spaceMember }),
}));

export default useSpaceMember;
