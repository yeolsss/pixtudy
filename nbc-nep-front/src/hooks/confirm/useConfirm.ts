import confirmStore, { ConfirmTextState } from "@/zustand/confirmStore";

export default function useConfirm() {
  const {
    closeConfirm,
    isOpen,
    message,
    openConfirm,
    result,
    resultConfirm,
    title,
    confirmButtonText,
    denyButtonText,
  } = confirmStore();

  const closeConfirmHandler = () => {
    // 닫기 이벤트
    closeConfirm();
  };

  const openConfirmHandler = (alertInfo: ConfirmTextState) => {
    return new Promise((res) => {
      openConfirm(alertInfo);
      const unsubscribe = confirmStore.subscribe((state) => {
        const result = state.result;
        res(result);
        unsubscribe();
      });
    });
  };

  const setResult = (result: boolean) => {
    resultConfirm(result);
  };

  return {
    closeConfirmHandler,
    openConfirmHandler,
    setResult,
    isOpen,
    message,
    result,
    title,
    confirmButtonText,
    denyButtonText,
  };
}
