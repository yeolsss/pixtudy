import { useState } from "react";
interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function ShareScreenInput({ inputRef }: Props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>current roomId: {value}</p>
    </>
  );
}
