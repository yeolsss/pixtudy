import styled from "styled-components";
import ForgetPasswordModalForm from "./ForgetPasswordModalForm";

export default function ForgetPasswordModalMainContainer() {
  return (
    <StModalContainer>
      <h2>비밀번호 찾기</h2>
      <span>이메일을 인증을 통해 비밀번호를 재설정 하세요.</span>
      <ForgetPasswordModalForm />
    </StModalContainer>
  );
}
export const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing[36]};
  border-radius: ${(props) => props.theme.border.radius[8]};

  & > h2 {
    font-size: ${(props) => props.theme.unit["32"]}px;
    margin-bottom: ${(props) => props.theme.spacing["12"]};
    font-family: var(--point-font);
    font-weight: bold;
  }

  & > span {
    font-size: ${(props) => props.theme.unit["12"]}px;
    margin-bottom: ${(props) => props.theme.spacing["24"]};
  }
`;
