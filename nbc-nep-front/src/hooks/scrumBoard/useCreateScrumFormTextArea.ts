import { cutTextToMaxLength } from "@/components/scrumboard/libs/util";
import useScrumBoardItemStore from "@/zustand/scrumBoardItemStore";
import { useEffect, useRef } from "react";

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
  const setValidBoardText = useScrumBoardItemStore.use.setValidBoardText();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const cutText = cutTextToMaxLength(e.target.value, maxLength);
    setValidBoardText(cutText.trim().length > 0);
    setText(cutText);
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, [text]);

  return [text, textAreaRef, handleChange];
}
