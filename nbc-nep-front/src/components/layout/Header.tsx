import { useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openLoginModal, openSignUpModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
import styled from "styled-components";
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

  const loginModeButton = [
    { text: "로그아웃", handler: handleLogout },
    { text: "DASH BOARD", handler: handleToDashboard },
  ];
  const logoutModeButton = [
    { text: "LOGIN", handler: handleOpenLoginModal },
    { text: "SIGNUP", handler: handleOpenSignUpModal },
  ];

  const currentButton = authStatus.isLogin ? loginModeButton : logoutModeButton;

  return (
    <>
      <StNavContainer>
        <div>
          <span onClick={() => router.push("/")}>NEP</span>
          <button>서비스 소개</button>
          <button>고객지원</button>
        </div>
        <div>
          {authStatus?.isLogin && <p>{authStatus.user.display_name}</p>}
          {currentButton.map((btn, index) => (
            <button key={index} onClick={btn.handler}>
              {btn.text}
            </button>
          ))}
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
    padding: 0 ${(props) => props.theme.spacing[24]};
    color: ${(props) => props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
    letter-spacing: var(--unit-4);
  }

  div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[32]};
  }

  p {
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  }

  button {
    border: none;
    padding: 0;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
    font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
    color: ${(props) => props.theme.color.text.disabled};
    &:hover {
      background-color: #fff;
      color: ${(props) =>
        props.theme.color.text.interactive["secondary-pressed"]};
    }
  }
`;

const StCTAButton = styled.button``;
