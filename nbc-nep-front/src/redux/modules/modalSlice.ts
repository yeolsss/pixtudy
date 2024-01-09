import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  loginModalOpen: boolean;
  signUpModalOpen: boolean;
}

const initialState: ModalState = {
  loginModalOpen: false,
  signUpModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      return (state = initialState);
    },
    openLoginModal: (state) => {
      state.loginModalOpen = !state.loginModalOpen;
    },
    openSignUpModalOpen: (state) => {
      state.signUpModalOpen = !state.signUpModalOpen;
    },
  },
});

export const { closeModal, openLoginModal, openSignUpModalOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
