import useModal from "@/hooks/modal/useModal";
import BackDrop from "../BackDrop";
import ForgetPasswordModalMainContainer from "./ForgetPasswordModalMainContainer";

export default function ForgetPasswordModal() {
  const { closeModal } = useModal();
  return (
    <>
      <BackDrop closeModal={closeModal} />
      <ForgetPasswordModalMainContainer />
    </>
  );
}
