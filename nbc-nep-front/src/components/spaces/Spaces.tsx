import { getCookie } from "@/utils/middlewareUtils";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";
import SpaceList from "./SpaceList";

interface Props {
  setRunState: (isRun: boolean) => void;
  showTemporaryComponent: boolean;
}

export default function Spaces({ setRunState, showTemporaryComponent }: Props) {
  const { user } = useAuth();
  const currentUserId = user.id;

  useEffect(() => {
    const message = getCookie("message");
    if (message) {
      // 메시지로 이벤트 처리
      pathValidation(message);
      // 쿠키 삭제
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  return (
    <SpaceList
      currentUserId={currentUserId}
      setRunState={setRunState}
      showTemporaryComponent={showTemporaryComponent}
    />
  );
}
