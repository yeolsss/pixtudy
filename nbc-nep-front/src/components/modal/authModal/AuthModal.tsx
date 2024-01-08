import BackDrop from "../BackDrop";
import AuthModalMainContainer from "./AuthModalMainContainer";

const AuthModal = ({ toggleLoginModal }: { toggleLoginModal: () => void }) => {
  return (
    <>
      <BackDrop toggleLoginModal={toggleLoginModal} />
      <AuthModalMainContainer />
    </>
  );
};

export default AuthModal;
