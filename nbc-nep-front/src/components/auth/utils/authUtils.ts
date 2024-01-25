import {
  handleValidateEmail,
  handleValidateNickname,
  handleValidatePassword,
  handleValidatePasswordMatch,
} from "@/utils/authValidate";

export type AuthFormType = "signUp" | "signIn" | "findPassword";

export interface FormValues {
  signIn_id?: string;
  signIn_pw?: string;
  signUp_id?: string;
  signUp_pw?: string;
  signUp_nickname?: string;
  signUp_check_pw?: string;
  find_password_email?: string;
}

export type FindPasswordMessageType = "success" | "fail";

export const getInputs = (formType: AuthFormType) => {
  if (formType === "signIn") {
    return [
      {
        id: "signIn_id",
        placeholder: "이메일을 입력해주세요.",
        type: "email",
        validate: handleValidateEmail,
      },
      {
        id: "signIn_pw",
        placeholder: "비밀번호를 입력해주세요.",
        type: "password",
        validate: handleValidatePassword,
      },
    ];
  }
  if (formType === "signUp") {
    return [
      {
        id: "signUp_id",
        placeholder: "이메일을 입력해주세요",
        type: "email",
        validate: handleValidateEmail,
      },
      {
        id: "signUp_pw",
        placeholder: "비밀번호를 입력해주세요",
        type: "password",
        validate: handleValidatePassword,
      },
      {
        id: "signUp_check_pw",
        placeholder: "비밀번호를 다시 입력해주세요",
        type: "password",
        validate: handleValidatePasswordMatch,
      },
      {
        id: "signUp_nickname",
        placeholder: "닉네임을 입력해주세요",
        type: "text",
        validate: handleValidateNickname,
      },
    ];
  }
  if (formType === "findPassword") {
    return [
      {
        id: "findPw_pw",
        placeholder: "새로운 비밀번호를 입력하세요.",
        type: "password",
        validate: handleValidatePassword,
      },
      {
        id: "findPw_check_pw",
        placeholder: "비밀번호를 다시 입력해주세요.",
        type: "password",
        validate: handleValidatePasswordMatch,
      },
    ];
  }
};
