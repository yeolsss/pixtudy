import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  isJoinSpaceModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  isJoinSpaceModalOpen: false,
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
    openJoinSpaceModal: (state) => {
      state.isJoinSpaceModalOpen = !state.isJoinSpaceModalOpen;
    },
  },
});

export const {
  closeModal,
  openLoginModal,
  openSignUpModal,
  openJoinSpaceModal,
} = modalSlice.actions;
export default modalSlice.reducer;
