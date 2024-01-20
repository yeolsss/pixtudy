import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import {
  toggleCreateSpaceModal,
  toggleJoinSpaceModal,
} from "@/redux/modules/modalSlice";
import styled from "styled-components";
import ModalPortal from "../modal/ModalPortal";
import CreateSpaceModal from "../modal/spaceModals/createSpaceModal/CreateSpaceModal";
import JoinSpaceModal from "../modal/spaceModals/joinSpaceModal/JoinSpaceModal";
import SpaceSearchForm from "./SpaceSearchForm";

export default function SpaceListHeader() {
  const dispatch = useAppDispatch();

  const { isCreateSpaceModalOpen, isJoinSpaceModalOpen } = useAppSelector(
    (state) => state.modalSlice
  );

  const handleOpenJoinSpaceModal = () => {
    dispatch(toggleJoinSpaceModal());
  };
  const handleOpenCreateSpaceModal = () => {
    dispatch(toggleCreateSpaceModal());
  };

  return (
    <>
      <StHeaderWrapper>
        <StNavContainer>
          <button>최근 방문</button>
          <button>나의 스페이스</button>
        </StNavContainer>
        <StButtonContainer>
          <SpaceSearchForm />
          <button onClick={handleOpenCreateSpaceModal}>
            새로운 스페이스 만들기
          </button>
          <button onClick={handleOpenJoinSpaceModal}>
            초대 코드로 입장하기
          </button>
        </StButtonContainer>
      </StHeaderWrapper>
      {isJoinSpaceModalOpen && (
        <ModalPortal>
          <JoinSpaceModal />
        </ModalPortal>
      )}
      {isCreateSpaceModalOpen && (
        <ModalPortal>
          <CreateSpaceModal />
        </ModalPortal>
      )}
    </>
  );
}
const StHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing[16]};
  padding: 0 ${(props) => props.theme.spacing[16]};
  button {
    height: ${(props) => props.theme.unit[48]}px;
    padding-top: ${(props) => props.theme.spacing[12]};
    padding-bottom: ${(props) => props.theme.spacing[12]};
    padding-right: ${(props) => props.theme.spacing[24]};
    padding-left: ${(props) => props.theme.spacing[24]};
  }
`;

const StNavContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[32]};
  button {
    border: none;
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    color: ${(props) => props.theme.color.text.disabled};
    padding: 0;
    &:hover {
      background-color: #fff;
      color: ${(props) =>
        props.theme.color.text.interactive["secondary-pressed"]};
    }
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[12]};
`;
