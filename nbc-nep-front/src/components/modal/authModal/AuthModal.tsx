import BackDrop from "../BackDrop";
import AuthModalMainContainer from "./AuthModalMainContainer";

export default function AuthModal({
  toggleLoginModal,
}: {
  toggleLoginModal: () => void;
}) {
  return (
    <>
      <BackDrop toggleLoginModal={toggleLoginModal} />
      <AuthModalMainContainer />
    </>
  );
}
