export type AuthFormType = "signUp" | "signIn" | "changePassword";

export interface FormValues {
  signIn_id?: string;
  signIn_pw?: string;
  signUp_id?: string;
  signUp_pw?: string;
  signUp_nickname?: string;
  signUp_check_pw?: string;
  forget_password_email?: string;
}

export type ForgetPasswordMessageType = "success" | "fail";
