import { loginHandler } from "@/api/auth";
import { validateEmail, validatePassword } from "@/utils/authFormValidate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "./AuthInput";

export default function AuthLoginMode({
  changeAuthMode,
}: {
  changeAuthMode: () => void;
}) {
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
  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const data = await loginHandler({
      email: values.login_id,
      password: values.login_pw,
      platform: "email",
    });
    if (data && "user" in data && data.user) {
      reset();
    }
  };

  const loginInput = [
    {
      id: "login_id",
      labelTitle: "이메일",
      placeholder: "이메일을 입력해주세요",
      type: "email",
      validate: validateEmail,
    },
    {
      id: "login_pw",
      labelTitle: "비밀번호",
      placeholder: "비밀번호를 입력해주세요",
      type: "password",
      validate: validatePassword,
    },
  ];

  return (
    <>
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
      <span>
        아직 회원이 아니신가요?{" "}
        <span onClick={changeAuthMode}>이메일로 회원가입</span>
      </span>
    </>
  );
}
