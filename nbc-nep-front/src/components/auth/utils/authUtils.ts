import { AuthFormType } from "@/types/auth.types";
import {
  handleValidateEmail,
  handleValidateNickname,
  handleValidatePassword,
  handleValidatePasswordMatch,
} from "@/utils/authValidate";

export const generateRandomIndex = (num: number) => {
  return Math.floor(Math.random() * num);
};

export const getInputs = (formType: AuthFormType) => {
  switch (formType) {
    case "signIn":
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
    case "signUp":
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
    case "changePassword":
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
    default:
      return [];
  }
};
