import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }: PropsWithChildren) {
  // 포탈의 마운트 상태 확인
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (typeof window === "undefined") return null;
  if (!isMount) return null;

  return createPortal(children, document.getElementById("modal-root")!);
}
