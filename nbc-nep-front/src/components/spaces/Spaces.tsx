import { getCookie } from "@/utils/middlewareUtils";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import { useEffect } from "react";
import styled from "styled-components";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const { user } = useAuth();

  const currentUserId = user.id;

  useEffect(() => {
    const message = getCookie("message");
    console.log(message);
    if (message) {
      // 메시지로 이벤트 처리
      pathValidation(message);
      // 쿠키 삭제
      document.cookie =
        "message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  return (
    <>
      <StBanner />
      <SpaceList currentUserId={currentUserId} />
    </>
  );
}

const StBanner = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 240px;
  background: url("/assets/wrapper.png");
  background-repeat: repeat-x;
  background-position: center;
  background-size: contain;
  margin-top: ${(props) => props.theme.spacing[32]};
  margin-bottom: ${(props) => props.theme.spacing[64]};
`;
