import { Spaces } from "@/supabase/types/supabase.tables.type";
import { create } from "zustand";

interface ModalState {
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
  isAvatarModalOpen: boolean;
  isForgetPasswordModalOpen: boolean;
  space: (Omit<Spaces, "users"> & { users: string[] }) | null;
}

interface ModalStoreState extends ModalState {
  openModal: (kind: keyof ModalState) => void;
  closeModal: () => void;
  setSpace: (space: Omit<Spaces, "users"> & { users: string[] }) => void;
  clearSpace: () => void;
}

const initialState = {
  isJoinSpaceModalOpen: false,
  isCreateSpaceModalOpen: false,
  isAvatarModalOpen: false,
  isForgetPasswordModalOpen: false,
  space: null,
};

const modalStore = create<ModalStoreState>()((set) => ({
  ...initialState,
  openModal: (kind: keyof ModalState) =>
    set(() => ({
      [kind]: true,
    })),
  closeModal: () =>
    set(() => ({
      ...initialState,
    })),
  setSpace: (space: Omit<Spaces, "users"> & { users: string[] }) =>
    set(() => ({ space })),
  clearSpace: () => set(() => ({ space: null })),
}));

export default modalStore;
