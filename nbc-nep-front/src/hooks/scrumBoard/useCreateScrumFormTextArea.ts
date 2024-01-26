import { useEffect, useRef } from "react";
import { textMaxLength } from "@/components/scrumboard/libs/util";

interface Props {
  text: string;
  setText: (scrumBoardText: string) => void;
  maxLength: number;
}

type ReturnType = [
  string,
  React.RefObject<HTMLTextAreaElement>,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
];
export default function useCreateScrumFormTextArea({
  text,
  setText,
  maxLength,
}: Props): ReturnType {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = textMaxLength(e.target.value, maxLength);
    setText(text);
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  return [text, textAreaRef, handleChange];
}
