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
