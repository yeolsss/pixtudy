import { useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";
import ModalPortal from "../modal/ModalPortal";
import JoinSpaceModal from "../modal/spaceModals/joinSpaceModal/JoinSpaceModal";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const currentUserId = useAppSelector((state) => state.authSlice.user.id);

  const isModalOpen = useAppSelector(
    (state) => state.modalSlice.isJoinSpaceModalOpen
  );
  return (
    <>
      <StBanner />
      <SpaceList currentUserId={currentUserId} />
      {isModalOpen && (
        <ModalPortal>
          <JoinSpaceModal />
        </ModalPortal>
      )}
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
