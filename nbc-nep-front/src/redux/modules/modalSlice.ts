import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isFindPasswordModalOpen: boolean;
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
}

const initialState: ModalState = {
  isFindPasswordModalOpen: false,
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
    toggleFindPasswordModal: (state) => {
      state.isFindPasswordModalOpen = !state.isFindPasswordModalOpen;
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
  toggleFindPasswordModal,
  toggleJoinSpaceModal,
  toggleCreateSpaceModal,
} = modalSlice.actions;
export default modalSlice.reducer;
