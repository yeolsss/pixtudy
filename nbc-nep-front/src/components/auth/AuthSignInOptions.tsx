import useModal from "@/hooks/modal/useModal";
import useAuthStore from "@/zustand/authStore";
import {
  StSaveLoginInfoToggleCheckBox,
  StSignInOptions,
} from "./styles/authSignInOptions.styles";

export default function SignInOptions() {
  const isCheck = useAuthStore.use.isSaveLoginInfo();
  const setSaveLoginInfo = useAuthStore.use.setSaveLoginInfo();
  const { openForgetPasswordModal } = useModal();

  const handleIsCheck = () => {
    setSaveLoginInfo(!isCheck);
  };

  const handleOpenForgetPasswordModal = () => {
    openForgetPasswordModal();
  };

  return (
    <StSignInOptions>
      <section>
        <input
          type="checkbox"
          id="save-login-info"
          checked={isCheck}
          onChange={handleIsCheck}
        />
        <StSaveLoginInfoToggleCheckBox
          htmlFor="save-login-info"
          $isCheck={isCheck}
        >
          <div>
            <div />
          </div>
          <span>로그인 정보 저장하기</span>
        </StSaveLoginInfoToggleCheckBox>
      </section>
      <button type="button" onClick={handleOpenForgetPasswordModal}>
        비밀번호 찾기
      </button>
    </StSignInOptions>
  );
}
