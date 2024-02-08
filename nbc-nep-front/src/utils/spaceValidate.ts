export const validateNickname = (nickname: string) => {
  const nicknameReg = /^.{2,8}$/;
  return nicknameReg.test(nickname) || "2글자 이상 8글자 이내여야 합니다.";
};
