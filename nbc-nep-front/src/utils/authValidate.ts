import { toast } from "react-toastify";

// email validation check function
export function handleValidateEmail(value: string) {
  const emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailReg.test(value) || "유효하지 않은 이메일 입니다.";
}

// password validation check function
export function handleValidatePassword(value: string) {
  const pwReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/);
  return (
    pwReg.test(value) || "문자, 숫자, 특수문자를 포함 8자리 이상을 입력하세요."
  );
}

// nickname validation check function
export function handleValidateNickname(value: string) {
  const nicknameReg = new RegExp(/^.{2,8}$/);
  return nicknameReg.test(value) || "닉네임은 최소 2글자, 최대 8글자 입니다.";
}

// password check validation check function
export function handleValidatePasswordMatch(
  value: string,
  watchValue?: string
) {
  return value === watchValue || "비밀번호가 일치하지 않습니다.";
}

type authMode = "signin" | "signup";
export function authValidation(errorMessage: string, mode: authMode) {
  switch (errorMessage) {
    case "Invalid login credentials":
      toast.error("일치하는 로그인 정보가 없습니다.");
      break;
    case "User already registered":
      toast.error("이미 존재하는 유저입니다.");
      break;
    default:
      if (mode === "signin") {
        toast.error("로그인 오류");
      } else {
        toast.error("회원가입 오류");
      }
      break;
  }
}
