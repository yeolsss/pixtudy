import { useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openLoginModal, openSignUpModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
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
    router.push("/");
  };

  const handleToDashboard = () => {
    router.push("/dashboard");
  };

  const loginModeButton = [
    { text: "LOGOUT", handler: handleLogout },
    { text: "DASH BOARD", handler: handleToDashboard },
  ];
  const logoutModeButton = [
    { text: "LOGIN", handler: handleOpenLoginModal },
    { text: "SIGNUP", handler: handleOpenSignUpModal },
  ];

  const currentButton = authStatus.isLogin ? loginModeButton : logoutModeButton;

  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        {currentButton.map((btn, index) => (
          <button key={index} onClick={btn.handler}>
            {btn.text}
          </button>
        ))}
        {authStatus.isLogin && (
          <span>
            {authStatus.user.display_name}/{authStatus.user.email}
          </span>
        )}
      </header>
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
