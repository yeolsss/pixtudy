import ForgetPasswordModalForm from "./ForgetPasswordModalForm";
import { StModalContainer } from "./styles/forgetPasswordModal.styles";

export default function ForgetPasswordModalMainContainer() {
  return (
    <StModalContainer>
      <h2>비밀번호 찾기</h2>
      <span>이메일을 인증을 통해 비밀번호를 재설정 하세요.</span>
      <ForgetPasswordModalForm />
    </StModalContainer>
  );
}
