import useConfirm from "@/hooks/confirm/useConfirm";
import Image from "next/image";
import styled from "styled-components";

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
          <button onClick={closeConfirmHandler}>{denyButtonText}</button>
          <button onClick={() => setResult(true)}>{confirmButtonText}</button>
        </div>
      </StConfirmMessageContainer>
    </StConfirmContainer>
  );
}

const StConfirmContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${(props) => props.theme.border.radius["8"]};

  display: flex;
  flex-direction: column;
  z-index: 10;

  min-width: ${(props) => props.theme.unit["412"]}px;

  background: ${(props) => props.theme.color.base.white};
`;

const StConfirmTitleArea = styled.div`
  position: relative;
  color: ${(props) => props.theme.color.base.white};
  & span {
    position: absolute;
    left: ${(props) => props.theme.spacing["12"]};
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--point-font);
    font-weight: bold;
    font-size: ${(props) => props.theme.unit["12"]}px;
  }
  & h2 {
    text-align: center;
    padding: ${(props) => `${props.theme.spacing["12"]} 0`};
    font-size: ${(props) => props.theme.unit["20"]}px;
    font-weight: bold;
    background: ${(props) => props.theme.color.bg.brand};
    border-radius: ${(props) =>
      `${props.theme.border.radius["8"]} ${props.theme.border.radius["8"]} 0 0`};
  }
`;

const StConfirmMessageContainer = styled.div`
  padding: ${(props) =>
    `${props.theme.spacing["32"]} ${props.theme.spacing["16"]}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  font-size: ${(props) => props.theme.unit["16"]}px;
  & > img {
    margin: ${(props) => props.theme.spacing[12]} auto;
  }
  & > div {
    margin-top: ${(props) => props.theme.spacing["24"]};
    display: flex;
    & > button + button {
      margin-left: ${(props) => props.theme.spacing["16"]};
    }
    & > button {
      border-radius: ${(props) => props.theme.border.radius["4"]};
      border-color: ${(props) => props.theme.color.border["sub-line"]};
    }

    & > button:first-child {
      &:hover {
        color: ${(props) => props.theme.color.base.white};
        background-color: ${(props) => props.theme.color.bg["danger-bold"]};
      }
    }

    & > button:last-child {
      color: ${(props) => props.theme.color.base.white};
      background-color: ${(props) => props.theme.color.bg.brand};
    }
  }
`;
