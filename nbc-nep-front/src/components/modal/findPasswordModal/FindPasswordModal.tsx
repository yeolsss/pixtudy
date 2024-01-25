import useModal from "@/hooks/modal/useModal";
import BackDrop from "../BackDrop";
import FindPasswordModalMainContainer from "./FindPasswordModalMainContainer";

export default function FindPasswordModal() {
  const { closeModal } = useModal();
  return (
    <>
      <BackDrop closeModal={closeModal} />
      <FindPasswordModalMainContainer />
    </>
  );
}
