import { signUpHandler } from "@/api/auth";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/utils/authFormValidate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "./AuthInput";

export type FormValues = {
  signup_id: string;
  signup_pw: string;
  signup_check_pw: string;
  signup_nickname: string;
  [key: string]: any;
};

export default function AuthSignUpMode({
  changeAuthMode,
}: {
  changeAuthMode: () => void;
}) {
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
    console.log(data);
    reset();
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
    <span>
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
      이미 회원이신가요? <span onClick={changeAuthMode}>로그인</span>
    </span>
  );
}
