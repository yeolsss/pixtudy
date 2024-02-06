import useModal from "@/hooks/modal/useModal";
import { useRouter } from "next/router";
import ModalPortal from "../modal/ModalPortal";
import CreateSpaceModal from "../modal/spaceModals/createSpaceModal/CreateSpaceModal";
import JoinSpaceModal from "../modal/spaceModals/joinSpaceModal/JoinSpaceModal";
import SpaceSearchForm from "./SpaceSearchForm";
import {
  StButtonContainer,
  StHeaderWrapper,
  StLine,
  StLink,
  StLinkWrapper,
  StNavContainer,
} from "./styles/spaceListHeader.style";

export default function SpaceListHeader() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
  } = useModal();

  const handleOpenJoinSpaceModal = () => {
    openJoinSpaceModal();
  };

  const handleOpenCreateSpaceModal = () => {
    openCreateSpaceModal();
  };

  const router = useRouter();
  return (
    <>
      <StHeaderWrapper>
        <StNavContainer>
          <StLinkWrapper>
            <StLink
              $isSelected={router.asPath !== "/dashboard"}
              href="/dashboard"
              scroll={false}
            >
              최근 방문
            </StLink>
          </StLinkWrapper>
          <StLine />
          <StLinkWrapper>
            <StLink
              scroll={false}
              $isSelected={router.asPath !== "/dashboard?query=myspace"}
              href="/dashboard?query=myspace"
            >
              나의 스페이스
            </StLink>
          </StLinkWrapper>
        </StNavContainer>
        <StButtonContainer>
          <SpaceSearchForm />
          <div className="dashboard-join-buttons">
            <button type="button" onClick={handleOpenCreateSpaceModal}>
              새로운 스페이스 만들기
            </button>
            <button type="button" onClick={handleOpenJoinSpaceModal}>
              초대 코드로 입장하기
            </button>
          </div>
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
