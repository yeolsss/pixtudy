import { Spaces } from "@/types/supabase.tables.types";
import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface ModalState {
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
  isCreateCategoryModalOpen: boolean;
  isAvatarModalOpen: boolean;
  isForgetPasswordModalOpen: boolean;
  isConfigModalOpen: boolean;
  space: Spaces | null;
}

interface ModalStoreState extends ModalState {
  openModal: (kind: keyof Omit<ModalState, "space">) => void;
  closeModal: () => void;
  setSpace: (space: Spaces) => void;
  clearSpace: () => void;
}

const initialState = {
  isJoinSpaceModalOpen: false,
  isCreateSpaceModalOpen: false,
  isCreateCategoryModalOpen: false,
  isAvatarModalOpen: false,
  isForgetPasswordModalOpen: false,
  isConfigModalOpen: false,
  space: null,
};

const modalStore = create<ModalStoreState>()((set) => ({
  ...initialState,
  openModal: (kind: keyof Omit<ModalState, "space">) =>
    set(() => ({
      [kind]: true,
    })),
  closeModal: () =>
    set(() => ({
      ...initialState,
    })),
  setSpace: (space: Spaces) => set(() => ({ space })),
  clearSpace: () => set(() => ({ space: null })),
}));

const useModalStore = createSelectors(modalStore);
export default useModalStore;
