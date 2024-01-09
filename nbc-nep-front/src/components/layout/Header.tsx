import { useRouter } from "next/navigation";

import ModalPortal from "../modal/ModalPortal";
import AuthModal from "../modal/authModal/AuthModal";

export default function Header() {
  const router = useRouter();

  const HandleOpenLoginModal = () => {};

  const HandleOpenSignUpModal = () => {};

  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        <button onClick={HandleOpenLoginModal}>LOGIN</button>
        <button onClick={HandleOpenSignUpModal}>SIGNUP</button>
        <button>LOGOUT</button>
        <button onClick={() => router.push("/dashboard")}>DASH BOARD</button>
      </header>
      {
        <ModalPortal>
          <AuthModal />
        </ModalPortal>
      }
    </>
  );
}
