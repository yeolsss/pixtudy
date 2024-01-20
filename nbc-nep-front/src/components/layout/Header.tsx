import { useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openLoginModal, openSignUpModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StCTAButton } from "../common/commonStyles.styles";
import ModalPortal from "../modal/ModalPortal";
import LoginModal from "../modal/authModals/loginModal/LoginModal";
import SignUpModal from "../modal/authModals/signUpModal/SignUpModal";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();

  const modalStatus = useAppSelector((state) => state.modalSlice);
  const authStatus = useAppSelector((state) => state.authSlice);

  const dispatch = useAppDispatch();

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  const handleOpenSignUpModal = () => {
    dispatch(openSignUpModal());
  };

  const handleLogout = () => {
    logout();
  };

  const handleToDashboard = () => {
    router.push("/dashboard");
  };

  const loginModeButton = [{ text: "로그아웃", handler: handleLogout }];
  const logoutModeButton = [
    { text: "LOGIN", handler: handleOpenLoginModal },
    { text: "SIGNUP", handler: handleOpenSignUpModal },
  ];
  const currentButton = authStatus.isLogin ? loginModeButton : logoutModeButton;

  return (
    <>
      <StNavContainer>
        <div>
          <span onClick={() => router.push("/")}>Pixtudy</span>
          <StNavButton>서비스 소개</StNavButton>
          <StNavButton>고객지원</StNavButton>
        </div>
        <div>
          {authStatus?.isLogin && <p>{authStatus.user.display_name}</p>}
          {currentButton.map((btn, index) => (
            <StNavButton key={index} onClick={btn.handler}>
              {btn.text}
            </StNavButton>
          ))}
          <StCTAButton onClick={handleToDashboard}>Dashboard</StCTAButton>
        </div>
      </StNavContainer>
      {/* login 모달 */}
      {modalStatus.isLoginModalOpen && (
        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      )}
      {/* 회원가입 모달 */}
      {modalStatus.isSignUpModalOpen && (
        <ModalPortal>
          <SignUpModal />
        </ModalPortal>
      )}
    </>
  );
}

const StNavContainer = styled.header`
  display: flex;
  width: 100%;
  height: ${(props) => props.theme.unit[96]}px;
  padding: ${(props) => props.theme.spacing[24]};
  justify-content: space-between;
  align-items: center;
  font-family: var(--sub-font);

  span {
    display: block;
    color: ${(props) => props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }

  div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[32]};
  }

  p {
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  }
`;

const StNavButton = styled.button`
  border: none;
  padding: 0;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
  color: ${(props) => props.theme.color.text.disabled};
  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }
`;
