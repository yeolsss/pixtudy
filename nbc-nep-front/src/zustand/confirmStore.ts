import { create } from "zustand";

export interface ConfirmTextState {
  title: string;
  message: string;
  denyButtonText?: string;
  confirmButtonText?: string;
}

interface ConfirmType extends ConfirmTextState {
  result: boolean;
  isOpen: boolean;
  openConfirm: ({
    title,
    message,
    confirmButtonText,
  }: ConfirmTextState) => void;
  closeConfirm: () => void;
  resultConfirm: (result: boolean) => void;
}

const initialState = {
  title: "",
  message: "",
  denyButtonText: "취소",
  confirmButtonText: "확인",
  result: false,
  isOpen: false,
};

const confirmStore = create<ConfirmType>()((set) => ({
  ...initialState,
  openConfirm: ({
    title,
    message,
    denyButtonText,
    confirmButtonText,
  }: ConfirmTextState) =>
    set(() => ({
      title,
      message,
      denyButtonText: denyButtonText ? denyButtonText : "취소",
      confirmButtonText: confirmButtonText ? confirmButtonText : "확인",
      isOpen: true,
    })),
  closeConfirm: () =>
    set(() => ({
      ...initialState,
    })),
  resultConfirm: (result: boolean) =>
    set(() => ({
      ...initialState,
      result,
    })),
}));

export default confirmStore;
