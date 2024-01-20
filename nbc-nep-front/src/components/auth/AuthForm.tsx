import { useSignInUser, useSignUpUser } from "@/hooks/query/useSupabase";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { closeModal, openLoginModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
import React from "react";
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
    <StFormContainer onSubmit={handleSubmit(handleForm)} $formType={formType}>
      {inputs?.map((input) => {
        if (input.id === "signUp_check_pw") {
          return (
            <>
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
              <span>영문, 숫자, 특수문자 포함 8~20자리를 입력해 주세요.</span>
            </>
          );
        }
        return (
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
        );
      })}

      {formType === "signIn" && <SignInOptions />}

      <button type="submit">
        {formType === "signIn" ? "로그인" : "이메일로 계정 만들기"}
      </button>
    </StFormContainer>
  );
}

const StFormContainer = styled.form<{ $formType: AuthFormType }>`
  & > input + input {
    margin-top: ${(props) => props.theme.spacing["16"]};
    font-family: inherit;
  }

  & > input + span {
    display: inline-block;
    margin-top: ${(props) => props.theme.spacing["8"]};
    margin-bottom: ${(props) => props.theme.spacing["16"]};
  }

  & > button {
    width: 100%;
    font-family: var(--point-font);
    font-weight: bold;
    font-size: ${(props) => props.theme.unit[15]}px;
    height: ${(props) => props.theme.unit["56"]}px;
    border: 1px solid
      ${(props) =>
        props.$formType === "signIn"
          ? props.theme.color.border.interactive["secondary-pressed"]
          : "transparent"};
    background: ${(props) =>
      props.$formType === "signIn"
        ? "transparent"
        : props.theme.color.bg.brand};
    color: ${(props) =>
      props.$formType === "signIn"
        ? props.theme.color.text.interactive["secondary-pressed"]
        : props.theme.color.text.interactive.inverse};
  }
`;
