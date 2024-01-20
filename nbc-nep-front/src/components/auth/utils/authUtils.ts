import {
  handleValidateEmail,
  handleValidateNickname,
  handleValidatePassword,
  handleValidatePasswordMatch,
} from "@/utils/authFormValidate";

export type AuthFormType = "signUp" | "signIn";

export interface FormValues {
  signIn_id?: string;
  signIn_pw?: string;
  signUp_id?: string;
  signUp_pw?: string;
  signUp_nickname?: string;
  signUp_check_pw?: string;
}

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
        labelTitle: "이메일",
        placeholder: "이메일을 입력해주세요",
        type: "email",
        validate: handleValidateEmail,
      },
      {
        id: "signUp_pw",
        labelTitle: "비밀번호",
        placeholder: "비밀번호를 입력해주세요",
        type: "password",
        validate: handleValidatePassword,
      },
      {
        id: "signUp_check_pw",
        labelTitle: "비밀번호 확인",
        placeholder: "비밀번호를 다시 입력해주세요",
        type: "password",
        validate: handleValidatePasswordMatch,
      },
      {
        id: "signUp_nickname",
        labelTitle: "닉네임",
        placeholder: "닉네임을 입력해주세요",
        type: "text",
        validate: handleValidateNickname,
      },
    ];
  }
};
