// email validation check function
export function handleValidateEmail(value: string) {
  const emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailReg.test(value) || "유효하지 않은 이메일 입니다.";
}

// password validation check function
export function handleValidatePassword(value: string) {
  const pwReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/);
  return (
    pwReg.test(value) ||
    "비밀번호는 최소 8자 이상이며, 문자와 숫자를 각각 하나 이상 포함해야 합니다."
  );
}

// nickname validation check function
export function handleValidateNickname(value: string) {
  const nicknameReg = new RegExp(/^.{2,8}$/);
  return nicknameReg.test(value) || "닉네임은 최소 2글자, 최대 8글자 입니다.";
}
