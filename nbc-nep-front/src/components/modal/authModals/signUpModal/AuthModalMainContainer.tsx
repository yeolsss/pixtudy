import { signUpHandler } from "@/api/auth";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/utils/authFormValidate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import AuthInput from "../AuthInput";

export default function SignUpModalMainContainer() {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //   submit event
  const onSignUp: SubmitHandler<FieldValues> = async (values) => {
    const data = await signUpHandler({
      email: values.signup_id,
      password: values.signup_pw,
      nickname: values.signup_nickname,
    });
    if (data && "user" in data && data.user) {
      reset();
    }
  };

  // password check validation check function
  const validatePasswordMatch = (value: string) => {
    return value === watch("signup_pw") || "비밀번호가 일치하지 않습니다.";
  };

  // input list
  const signUpInput = [
    {
      id: "signup_id",
      labelTitle: "이메일",
      placeholder: "이메일을 입력해주세요",
      type: "email",
      validate: validateEmail,
    },
    {
      id: "signup_pw",
      labelTitle: "비밀번호",
      placeholder: "비밀번호를 입력해주세요",
      type: "password",
      validate: validatePassword,
    },
    {
      id: "signup_check_pw",
      labelTitle: "비밀번호 확인",
      placeholder: "비밀번호를 다시 입력해주세요",
      type: "password",
      validate: validatePasswordMatch,
    },
    {
      id: "signup_nickname",
      labelTitle: "닉네임",
      placeholder: "닉네임을 입력해주세요",
      type: "text",
      validate: validateNickname,
    },
  ];

  return (
    <StModalContainer>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSignUp)}>
        {signUpInput.map((inputInfo) => {
          inputInfo.type;
          return (
            <AuthInput
              key={inputInfo.id}
              id={inputInfo.id}
              labelTitle={inputInfo.labelTitle}
              placeholder={inputInfo.placeholder}
              type={inputInfo.type}
              register={register}
              validate={inputInfo.validate}
              error={errors[inputInfo.id]}
            />
          );
        })}
        <button type="submit">회원가입</button>
      </form>
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
