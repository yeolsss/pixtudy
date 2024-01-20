import { useFindPassword } from "@/hooks/query/useSupabase";
import { handleValidateEmail } from "@/utils/authFormValidate";
import React, { useState } from "react";
import styled from "styled-components";

export default function FindPasswordModalMainContainer() {
  const { findPassword } = useFindPassword();
  const [mailValue, setMailValue] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMailValue(e.target.value);

  const handleSendFindMail = () => {
    if (mailValue) {
      const validationCheck = handleValidateEmail(mailValue);
      if (!!validationCheck) {
        findPassword(mailValue, {
          onSuccess: (message) => {
            setAlertMessage(message);
          },
        });
      }
    }
  };

  return (
    <StModalContainer>
      <h1>비밀번호 찾기</h1>
      <input
        placeholder="이메일을 입력하시오"
        type="email"
        value={mailValue}
        onChange={handleChangeMail}
      />
      <button onClick={handleSendFindMail}>메일 보내기</button>
      <span>{alertMessage}</span>
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
  width: 50rem;
  height: 50rem;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;
