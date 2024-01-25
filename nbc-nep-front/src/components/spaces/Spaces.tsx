import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const router = useRouter();

  const { user } = useAuth();

  const currentUserId = user.id;

  useEffect(() => {
    if (typeof router.query.message === "string" && !!router.query.message)
      pathValidation(router.query.message);
  }, [router.query]);

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
