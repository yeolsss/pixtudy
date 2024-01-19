import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  isJoinSpaceModalOpen: false,
  isCreateSpaceModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      return (state = initialState);
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    openSignUpModal: (state) => {
      state.isSignUpModalOpen = !state.isSignUpModalOpen;
    },
    toggleJoinSpaceModal: (state) => {
      state.isJoinSpaceModalOpen = !state.isJoinSpaceModalOpen;
    },
    toggleCreateSpaceModal: (state) => {
      state.isCreateSpaceModalOpen = !state.isCreateSpaceModalOpen;
    },
  },
});

export const {
  closeModal,
  openLoginModal,
  openSignUpModal,
  toggleJoinSpaceModal,
  toggleCreateSpaceModal,
} = modalSlice.actions;
export default modalSlice.reducer;
