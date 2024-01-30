import { info, success } from "@/assets/auth";
import AuthInput from "@/components/auth/AuthInput";
import {
  ForgetPasswordMessageType,
  FormValues,
} from "@/components/auth/utils/authUtils";
import { useForgetPassword } from "@/hooks/query/useSupabase";
import { authValidation, handleValidateEmail } from "@/utils/authValidate";
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

  const { forgetPassword, isPending } = useForgetPassword();

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
        onError: (error) => {
          const errorMessage = authValidation(error.message, "changePassword");
          setAlertMessage({ response: "fail", message: errorMessage! });
        },
      });
    }
  };

  useEffect(() => {
    setAlertMessage(null);
  }, [errors["forget_password_email"]]);

  return (
    <StForgetPasswordModalForm
      onSubmit={handleSubmit(handleSendFindMail)}
      $isPending={isPending}
    >
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
      <button disabled={isPending}>
        {isPending ? "메일을 보내는 중" : "메일 보내기"}
      </button>
    </StForgetPasswordModalForm>
  );
}

const StForgetPasswordModalForm = styled.form<{ $isPending: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.unit["412"]};

  @media screen and (max-width: 500px) {
    width: 30rem;
  }

  & > input {
    font-family: inherit;
  }

  & > button {
    margin-top: ${(props) => props.theme.spacing["20"]};
    font-size: ${(props) => props.theme.unit["16"]};
    height: ${(props) => props.theme.unit["40"]};
    background: ${(props) =>
      props.$isPending
        ? props.theme.color.bg.disabled
        : props.theme.color.bg.brand};
    color: ${(props) => props.theme.color.text.interactive.inverse};
    border-color: ${(props) => props.theme.color.text.interactive.inverse};
    cursor: ${(props) => (props.$isPending ? "default" : "pointer")};
  }

  & > span {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.unit["12"]};
    margin-top: ${(props) => props.theme.spacing["8"]};
    line-height: ${(props) => props.theme.spacing["20"]};
    white-space: pre-line;
    & img {
      margin: 0 ${(props) => props.theme.spacing[8]};
    }
  }
`;
