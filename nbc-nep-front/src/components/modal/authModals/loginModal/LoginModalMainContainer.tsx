import { useLoginUser } from "@/hooks/query/useSupabase";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { closeModal } from "@/redux/modules/modalSlice";
import {
  handleValidateEmail,
  handleValidatePassword,
} from "@/utils/authFormValidate";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthInput from "../AuthInput";
import SocialLogin from "./SocialLogin";

export default function LoginModalMainContainer() {
  const login = useLoginUser();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // signUp hook form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //   submit event
  const handleLogin: SubmitHandler<FieldValues> = (values) => {
    login(
      {
        email: values.login_id,
        password: values.login_pw,
        platform: "email",
      },
      {
        onSuccess: () => {
          reset();
          dispatch(closeModal());
          console.log(process.env.NODE_ENV);
          // Check if NODE_ENV is development and redirect accordingly
          const redirectPath =
            process.env.NODE_ENV === "development"
              ? "/dashboard"
              : `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
          router.push(redirectPath);
        },
      }
    );
  };

  const loginInput = [
    {
      id: "login_id",
      labelTitle: "이메일",
      placeholder: "이메일을 입력해주세요",
      type: "email",
      validate: handleValidateEmail,
    },
    {
      id: "login_pw",
      labelTitle: "비밀번호",
      placeholder: "비밀번호를 입력해주세요",
      type: "password",
      validate: handleValidatePassword,
    },
  ];
  return (
    <StModalContainer>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        {loginInput.map((input) => {
          return (
            <AuthInput
              key={input.id}
              id={input.id}
              labelTitle={input.labelTitle}
              placeholder={input.placeholder}
              type={input.type}
              register={register}
              validate={input.validate}
              error={errors[input.id]}
            />
          );
        })}
        <button type="submit">로그인</button>
      </form>
      <SocialLogin />
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  width: 50rem;
  height: 50rem;
`;
