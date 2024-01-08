import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalPortal from "../modal/ModalPortal";

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
          <div>이게 모달이여</div>
        </ModalPortal>
      )}
    </>
  );
};

export default Header;
