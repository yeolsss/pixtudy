import { info, success } from "@/assets/auth";
import AuthInput from "@/components/auth/AuthInput";
import { useForgetPassword } from "@/hooks/query/useSupabase";
import { authValidation, handleValidateEmail } from "@/utils/authValidate";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordMessageType, FormValues } from "@/types/auth.types";
import { StForgetPasswordModalForm } from "./styles/forgetPasswordModal.styles";

export default function ForgetPasswordModalForm() {
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
    if (values.forget_password_email) {
      forgetPassword(values.forget_password_email, {
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
  }, [errors.forget_password_email]);

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

      {!!alertMessage && !errors.forget_password_email && (
        <span>
          <Image
            src={alertMessage.response === "fail" ? info : success}
            alt=""
          />
          {alertMessage.message}
        </span>
      )}
      <button type="button" disabled={isPending}>
        {isPending ? "메일을 보내는 중" : "메일 보내기"}
      </button>
    </StForgetPasswordModalForm>
  );
}
