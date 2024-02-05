import useConfirm from "@/hooks/confirm/useConfirm";
import BackDrop from "../BackDrop";
import ConfirmModalContainer from "./ConfirmModalContainer";
import { StModalContainer } from "./styles/confirmModal.styles";

export default function ConfirmModal() {
  const { closeConfirmHandler } = useConfirm();
  return (
    <StModalContainer>
      <BackDrop closeModal={closeConfirmHandler} />
      <ConfirmModalContainer />
    </StModalContainer>
  );
}
