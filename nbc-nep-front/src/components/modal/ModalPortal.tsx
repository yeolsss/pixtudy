import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactElement }) => {
  // 포탈의 마운트 상태 확인
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined") return null;
  if (!mounted) return null;

  return createPortal(children, document.getElementById("modal-root")!);
};

export default ModalPortal;
