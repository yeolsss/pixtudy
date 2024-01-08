import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalPortal from "../modal/ModalPortal";
import AuthModal from "../modal/authModal/AuthModal";

const Header = () => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen((prev) => !prev);
  };

  return (
    <>
      <header>
        <h1 onClick={() => router.push("/")}>LOGO</h1>
        <button onClick={toggleLoginModal}>LOGIN</button>
        <button>LOGOUT</button>
        <button onClick={() => router.push("/dashboard")}>DASH BOARD</button>
      </header>
      {isLoginModalOpen && (
        <ModalPortal>
          <AuthModal />
        </ModalPortal>
      )}
    </>
  );
};

export default Header;
