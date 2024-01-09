import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
}

const initialState: ModalState = {
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
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
  },
});

export const { closeModal, openLoginModal, openSignUpModal } =
  modalSlice.actions;
export default modalSlice.reducer;
