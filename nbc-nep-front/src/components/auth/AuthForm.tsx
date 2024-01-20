import { useSignInUser, useSignUpUser } from "@/hooks/query/useSupabase";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { closeModal, openLoginModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthFormType, getInputs } from "./utils/authUtils";
import AuthInput from "./AuthInput";
import styled from "styled-components";
import SignInOptions from "./signin/SignInOptions";

interface Props {
  formType: AuthFormType;
}
export default function AuthForm({ formType }: Props) {
  const signUp = useSignUpUser();
  const dispatch = useAppDispatch();
  const signIn = useSignInUser();
  const router = useRouter();
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState<boolean>(
    formType === "signIn" ? true : false
  );

  const handleOpenSignUpForm = () => {
    setIsSignUpFormOpen(true);
  };

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleForm: SubmitHandler<FieldValues> = (values) => {
    if (formType === "signIn") {
      signIn(
        {
          email: values.login_id,
          password: values.login_pw,
          platform: "email",
        },
        {
          onSuccess: () => {
            reset();
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
            dispatch(closeModal());
            dispatch(openLoginModal());
          },
        }
      );
    }
  };

  const inputs = getInputs(formType);

  return (
    <StFormContainer
      onSubmit={handleSubmit(handleForm)}
      $isOpen={isSignUpFormOpen}
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

      <button
        type={formType === "signUp" && !isSignUpFormOpen ? "button" : "submit"}
        onClick={
          formType === "signUp" && !isSignUpFormOpen
            ? handleOpenSignUpForm
            : undefined
        }
      >
        {formType === "signIn" ? "로그인" : "이메일로 계정 만들기"}
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
      margin ease-in-out 0.5s,
      border ease-in-out 0.5s,
      background ease-in-out 0.5s,
      color ease-in-out 0.5s;
  }
`;

const StInputContainer = styled.section<{ $isOpen: boolean }>`
  max-height: ${(props) => (props.$isOpen ? "100%" : "0%")};
  overflow-y: hidden;
  transform-origin: top;
  transform: ${(props) => (props.$isOpen ? "scaleY(1)" : "scaleY(0)")};
  transition:
    max-height ease-in-out 0.5s,
    transform ease-in-out 0.3s;

  width: 100%;

  & > div + div {
    margin-top: ${(props) => props.theme.spacing["16"]};
    font-family: inherit;
  }
`;
