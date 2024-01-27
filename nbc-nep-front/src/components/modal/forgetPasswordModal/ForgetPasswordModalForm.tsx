import { info, success } from "@/assets/auth";
import AuthInput from "@/components/auth/AuthInput";
import {
  ForgetPasswordMessageType,
  FormValues,
} from "@/components/auth/utils/authUtils";
import { useForgetPassword } from "@/hooks/query/useSupabase";
import { handleValidateEmail } from "@/utils/authValidate";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

export default function ForgetPasswordModalForm({}) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const { forgetPassword } = useForgetPassword();

  const [alertMessage, setAlertMessage] = useState<{
    response: ForgetPasswordMessageType;
    message: string;
  } | null>();

  const handleSendFindMail: SubmitHandler<FormValues> = (values) => {
    if (values["forget_password_email"]) {
      forgetPassword(values["forget_password_email"], {
        onSuccess: (message) => {
          setAlertMessage(message);
        },
      });
    }
  };

  useEffect(() => {
    setAlertMessage(null);
  }, [errors["forget_password_email"]]);

  return (
    <StForgetPasswordModalForm onSubmit={handleSubmit(handleSendFindMail)}>
      <AuthInput
        error={errors}
        id="forget_password_email"
        placeholder="이메일을 입력하세요"
        register={register}
        type="email"
        validate={handleValidateEmail}
        watch={watch}
      />

      {!!alertMessage && !errors["forget_password_email"] && (
        <span>
          <Image
            src={alertMessage.response === "fail" ? info : success}
            alt=""
          />
          {alertMessage.message}
        </span>
      )}
      <button>메일 보내기</button>
    </StForgetPasswordModalForm>
  );
}

const StForgetPasswordModalForm = styled.form`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.unit["412"]}px;

  & > input {
    font-family: inherit;
  }

  & > button {
    margin-top: ${(props) => props.theme.spacing["20"]};
    font-size: ${(props) => props.theme.unit["16"]}px;
    height: ${(props) => props.theme.unit["40"]}px;
    background: ${(props) => props.theme.color.bg.brand};
    color: ${(props) => props.theme.color.text.interactive.inverse};
    border-color: ${(props) => props.theme.color.text.interactive.inverse};
  }

  & > span {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.unit["12"]}px;
    margin-top: ${(props) => props.theme.spacing["8"]};
    line-height: ${(props) => props.theme.spacing["20"]};
    white-space: pre-line;
    & img {
      margin: 0 ${(props) => props.theme.spacing[8]};
    }
  }
`;
