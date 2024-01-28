import useConfirm from "@/hooks/confirm/useConfirm";
import styled from "styled-components";
import BackDrop from "../BackDrop";
import ConfirmModalContainer from "./ConfirmModalContainer";

export default function ConfirmModalModal() {
  const { closeConfirmHandler } = useConfirm();
  return (
    <StModalContainer>
      <BackDrop closeModal={closeConfirmHandler} />
      <ConfirmModalContainer />
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;
