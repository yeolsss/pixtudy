import React, { useState } from "react";

type UseInput<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
];

export default function useInput<T>(initialValue: T): UseInput<T> {
  const [state, setState] = useState<T>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as T;
    setState(value);
  };

  return [state, setState, onChange];
}
