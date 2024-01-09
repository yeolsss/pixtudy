import { useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openLoginModal, openSignUpModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/navigation";
import ModalPortal from "../modal/ModalPortal";
import LoginModal from "../modal/authModals/loginModal/LoginModal";
import SignUpModal from "../modal/authModals/signUpModal/SignUpModal";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();
  const isLogin = useAppSelector((state) => state.authSlice.isLogin);

  const modalStatus = useAppSelector((state) => state.modalSlice);

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

  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        {!isLogin && <button onClick={handleOpenLoginModal}>LOGIN</button>}
        {isLogin && (
          <>
            <button onClick={handleOpenSignUpModal}>SIGNUP</button>
            <button onClick={handleLogout}>LOGOUT</button>
            <button onClick={() => router.push("/dashboard")}>
              DASH BOARD
            </button>
          </>
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
