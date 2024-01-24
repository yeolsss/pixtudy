import { create } from "zustand";

interface ModalState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
}

interface ModalStoreState extends ModalState {
  openModal: (kind: keyof ModalState) => void;
  closeModal: (kind: keyof ModalState) => void;
}

const initialState = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  isJoinSpaceModalOpen: false,
  isCreateSpaceModalOpen: false,
};

const modalStore = create<ModalStoreState>()((set) => ({
  ...initialState,
  openModal: (kind: keyof ModalState) =>
    set(() => ({
      [kind]: true,
    })),
  closeModal: (kind: keyof ModalState) =>
    set(() => ({
      ...initialState,
    })),
}));

export default modalStore;
