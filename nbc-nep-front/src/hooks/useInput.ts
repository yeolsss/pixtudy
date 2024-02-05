import React, { useState } from "react";
import usePhaserInput from "@/hooks/phaser/usePhaserInput";

type UseInput<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  () => void,
];

export default function useInput<T>(initialValue: T): UseInput<T> {
  const [state, setState] = useState<T>(initialValue);
  const { enableInput, disableInput } = usePhaserInput();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as T;
    setState(value);
  };

  const handleFocus = () => disableInput();
  const handleBlur = () => enableInput();

  return [state, setState, onChange, handleFocus, handleBlur];
}
