import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useAuthStore from "@/zustand/authStore";
import {
  useLogoutUser,
  useSignInUser,
  useSignUpUser,
  useUpdateUserPw,
} from "@/hooks/query/useSupabase";
import { AuthFormType, FormValues } from "@/types/auth.types";
import { getInputs } from "@/components/auth/utils/authUtils";

import SignInOptions from "./AuthSignInOptions";
import AuthInput from "./AuthInput";
import {
  StFormContainer,
  StInputContainer,
  StSuccessChangePw,
} from "./styles/authForm.styles";

interface Props {
  formType: AuthFormType;
}

export default function AuthForm({ formType }: Props) {
  const signUp = useSignUpUser();
  const signIn = useSignInUser();
  const updatePw = useUpdateUserPw();
  const logout = useLogoutUser();

  const router = useRouter();

  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState<boolean>(
    formType !== "signUp"
  );

  const [isUpdatePw, setIsUpdatePw] = useState<boolean>(false);

  const isSaveLoginInfo = useAuthStore.use.isSaveLoginInfo();
  const setSaveLoginInfo = useAuthStore.use.setSaveLoginInfo();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  useEffect(() => {
    const savedLogin = localStorage.getItem("saveLogin");

    if (savedLogin) {
      setSaveLoginInfo(true);
      setValue("signIn_id", savedLogin);
    } else {
      setSaveLoginInfo(false);
    }
  }, []);

  const handleForm: SubmitHandler<FieldValues> = (values) => {
    if (formType === "signIn") {
      signIn(
        {
          email: values.signIn_id,
          password: values.signIn_pw,
          platform: "email",
        },
        {
          onSuccess: async (data) => {
            if ("user" in data) {
              if (isSaveLoginInfo) {
                localStorage.setItem("saveLogin", data.user.email!);
              } else {
                localStorage.removeItem("saveLogin");
              }
            }
            router.push("/dashboard");
          },
        }
      );
    }
    if (formType === "signUp") {
      signUp(
        {
          email: values.signUp_id,
          password: values.signUp_pw,
          nickname: values.signUp_nickname,
        },
        {
          onSuccess: () => {
            reset();
            router.push("/");
          },
        }
      );
    }
    if (formType === "changePassword") {
      updatePw(values.findPw_pw, {
        onSuccess: () => {
          setIsUpdatePw(true);
        },
      });
    }
  };

  const handleOpenSignUpForm = () => {
    setIsSignUpFormOpen(true);
  };

  const handleToSignIn = () => {
    logout(undefined, {
      onSuccess: async () => {
        router.push("/signin");
      },
    });
  };

  const handleOnClick = () => {
    if (formType === "signUp" && !isSignUpFormOpen) {
      return handleOpenSignUpForm;
    }
    if (formType === "changePassword" && isUpdatePw) {
      return handleToSignIn;
    }
    return () => {};
  };

  const buttonText = () => {
    switch (formType) {
      case "changePassword":
        return isUpdatePw ? "로그인 하러 가기" : "비밀번호 업데이트";
      case "signIn":
        return "로그인";
      case "signUp":
        return "이메일로 계정 만들기";
      default:
        return "";
    }
  };

  const inputs = getInputs(formType);

  return (
    <StFormContainer
      onSubmit={handleSubmit(handleForm)}
      $isOpen={isSignUpFormOpen}
      noValidate
    >
      <StInputContainer $isOpen={isSignUpFormOpen}>
        {inputs?.map((input) => (
          <AuthInput
            key={input.id}
            error={errors}
            id={input.id}
            placeholder={input.placeholder}
            register={register}
            type={input.type}
            validate={input.validate}
            watch={watch}
          />
        ))}
      </StInputContainer>

      {formType === "signIn" && <SignInOptions />}

      {isUpdatePw && (
        <StSuccessChangePw>
          성공적으로 비밀번호를 변경하였습니다.
        </StSuccessChangePw>
      )}

      <button
        type={
          (formType === "signUp" && !isSignUpFormOpen) ||
          (formType === "changePassword" && isUpdatePw)
            ? "button"
            : "submit"
        }
        onClick={handleOnClick()}
      >
        {buttonText()}
      </button>
    </StFormContainer>
  );
}
