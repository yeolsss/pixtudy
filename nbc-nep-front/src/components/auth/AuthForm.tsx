import {
  useLogoutUser,
  useSignInUser,
  useSignUpUser,
  useUpdateUserPw,
} from "@/hooks/query/useSupabase";
import useAuth from "@/zustand/authStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthInput from "./AuthInput";
import SignInOptions from "./SignInOptions";
import { AuthFormType, FormValues, getInputs } from "./utils/authUtils";

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
    formType === "signUp" ? false : true
  );

  const [isUpdatePw, setIsUpdatePw] = useState<boolean>(false);

  const { isSaveLoginInfo, setSaveLoginInfo } = useAuth();

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
            router.push("/signin");
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
        await router.push("/signin");
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

const StFormContainer = styled.form<{
  $isOpen: boolean;
}>`
  width: 100%;
  & > button {
    margin-top: ${(props) =>
      props.$isOpen ? props.theme.spacing["16"] : "0px"};
    width: 100%;
    font-family: var(--point-font);
    font-weight: bold;
    font-size: ${(props) => props.theme.unit[15]}px;
    height: ${(props) => props.theme.unit["56"]}px;
    border: 1px solid
      ${(props) =>
        props.$isOpen
          ? props.theme.color.border.interactive["secondary-pressed"]
          : "transparent"};
    background: ${(props) =>
      props.$isOpen ? "transparent" : props.theme.color.bg.brand};
    color: ${(props) =>
      props.$isOpen
        ? props.theme.color.text.interactive["secondary-pressed"]
        : props.theme.color.text.interactive.inverse};
    transition:
      margin ease-in-out 0.3s,
      border ease-in-out 0.3s,
      background ease-in-out 0.3s,
      color ease-in-out 0.3s;

    &:hover {
      border-color: transparent;
      background: ${(props) => props.theme.color.bg.brand};
      color: ${(props) => props.theme.color.text.interactive.inverse};
    }
  }
`;

const StInputContainer = styled.section<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "100%" : "0px")};

  overflow-y: hidden;
  transform-origin: top;
  transform: ${(props) => (props.$isOpen ? "scaleY(1)" : "scaleY(0)")};
  transition:
    max-height ease-in-out 0.5s,
    transform ease-in-out 0.3s;

  & > div + div {
    margin-top: ${(props) => props.theme.spacing["16"]};
    font-family: inherit;
  }
`;

const StSuccessChangePw = styled.span`
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.spacing["16"]} 0;
  font-size: ${(props) => props.theme.unit["16"]}px;
  font-weight: bold;
  color: ${(props) => props.theme.color.text.brand};
`;
