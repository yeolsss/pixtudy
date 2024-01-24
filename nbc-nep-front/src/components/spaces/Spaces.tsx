import useAuth from "@/zustand/authStore";
import styled from "styled-components";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const { user } = useAuth();
  const currentUserId = user.id;

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
