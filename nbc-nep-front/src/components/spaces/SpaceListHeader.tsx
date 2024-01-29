import useModal from "@/hooks/modal/useModal";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import ModalPortal from "../modal/ModalPortal";
import CreateSpaceModal from "../modal/spaceModals/createSpaceModal/CreateSpaceModal";
import JoinSpaceModal from "../modal/spaceModals/joinSpaceModal/JoinSpaceModal";
import SpaceSearchForm from "./SpaceSearchForm";

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
            >
              최근 방문
            </StLink>
          </StLinkWrapper>
          <StLine />
          <StLinkWrapper>
            <StLink
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
            <button onClick={handleOpenCreateSpaceModal}>
              새로운 스페이스 만들기
            </button>
            <button onClick={handleOpenJoinSpaceModal}>
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
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  }
`;

const StNavContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[32]};
  align-items: center;
  button {
    position: relative;
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
  & > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[12]};
  }
`;

const StLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StLine = styled.div`
  width: 0px;
  height: ${(props) => props.theme.body.md.medium.fontSize};
  border: 1px solid
    ${(props) => props.theme.color.text.interactive["secondary-pressed"]};
`;

const StLink = styled(Link)<{ $isSelected: boolean }>`
  position: relative;
  border: none;

  font-family: var(--point-font);
  ${(props) => props.$isSelected && `color: var(--color-neutral-400);`};

  font-size: ${(props) => props.theme.body.lg.medium.fontSize};
  font-weight: ${(props) => props.theme.body.lg.medium.fontWeight};

  vertical-align: bottom;
  padding: 0;

  display: inline-block;
`;
