import { FocusEvent } from "react";
import usePhaserInput from "../phaser/usePhaserInput";

export default function useFocusInput() {
  const { enableInput, disableInput } = usePhaserInput();

  const handleBlur = (e: FocusEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      console.log("blur here");
      enableInput();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      console.log("focus here");
      disableInput();
    }
  };

  return [handleFocus, handleBlur];
}
