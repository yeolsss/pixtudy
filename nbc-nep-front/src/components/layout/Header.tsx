import {
  openLoginModal,
  openSignUpModalOpen,
} from "@/redux/modules/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "../modal/ModalPortal";
import LoginModal from "../modal/authModals/loginModal/LoginModal";
import SignUpModal from "../modal/authModals/signUpModal/SignUpModal";

export default function Header() {
  const router = useRouter();

  const modalStatus = useSelector((state: RootState) => state.modalSlice);

  const dispatch = useDispatch<AppDispatch>();

  const HandleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  const HandleOpenSignUpModal = () => {
    dispatch(openSignUpModalOpen());
  };

  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        <button onClick={HandleOpenLoginModal}>LOGIN</button>
        <button onClick={HandleOpenSignUpModal}>SIGNUP</button>
        <button>LOGOUT</button>
        <button onClick={() => router.push("/dashboard")}>DASH BOARD</button>
      </header>
      {modalStatus.loginModalOpen && (
        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      )}
      {modalStatus.signUpModalOpen && (
        <ModalPortal>
          <SignUpModal />
        </ModalPortal>
      )}
    </>
  );
}
