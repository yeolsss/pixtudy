import useConfirm from "@/hooks/confirm/useConfirm";
import Image from "next/image";
import {
  StConfirmContainer,
  StConfirmMessageContainer,
  StConfirmTitleArea,
} from "./styles/confirmModal.styles";

export default function ConfirmModalContainer() {
  const {
    title,
    message,
    confirmButtonText,
    denyButtonText,
    closeConfirmHandler,
    setResult,
  } = useConfirm();
  return (
    <StConfirmContainer>
      <StConfirmTitleArea>
        <span>Pixtudy</span>
        <h2>{title}</h2>
      </StConfirmTitleArea>
      <StConfirmMessageContainer>
        <Image
          src="/assets/dummy_down.png"
          alt="dummy"
          width={32}
          height={32}
        />
        <p>{message}</p>
        <div>
          <button type="button" onClick={closeConfirmHandler}>
            {denyButtonText}
          </button>
          <button type="button" onClick={() => setResult(true)}>
            {confirmButtonText}
          </button>
        </div>
      </StConfirmMessageContainer>
    </StConfirmContainer>
  );
}
