import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";
import { ConfirmTextState } from "@/types/zustand.types";

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
      denyButtonText: denyButtonText || "취소",
      confirmButtonText: confirmButtonText || "확인",
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

const useConfirmStore = createSelectors(confirmStore);
export default useConfirmStore;
