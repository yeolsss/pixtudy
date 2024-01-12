import { useGetCurrentUser, useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openLoginModal, openSignUpModal } from "@/redux/modules/modalSlice";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalPortal from "../modal/ModalPortal";
import LoginModal from "../modal/authModals/loginModal/LoginModal";
import SignUpModal from "../modal/authModals/signUpModal/SignUpModal";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();
  const isLogin = useAppSelector((state) => state.authSlice.isLogin);

  const modalStatus = useAppSelector((state) => state.modalSlice);
  const [currentUser, setCurrentUser] = useState<Tables<"users"> | null>(null);

  const dispatch = useAppDispatch();

  const getCurrentUser = useGetCurrentUser();

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  const handleOpenSignUpModal = () => {
    dispatch(openSignUpModal());
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
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

  const currentButton = isLogin ? loginModeButton : logoutModeButton;

  useEffect(() => {
    getCurrentUser(undefined, {
      onSuccess: (response) => {
        setCurrentUser(response);
      },
    });
  }, []);
  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        {currentButton.map((btn, index) => (
          <button key={index} onClick={btn.handler}>
            {btn.text}
          </button>
        ))}
        {currentUser && (
          <span>
            {currentUser.display_name}/{currentUser.email}
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
