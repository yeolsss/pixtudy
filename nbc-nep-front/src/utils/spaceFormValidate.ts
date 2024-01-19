export const validateNickname = (nickname: string) => {
  const nicknameReg = new RegExp(/^.{2,12}$/);
  return (
    nicknameReg.test(nickname) || "닉네임은 2글자 이상 12글자 이내여야 합니다."
  );
};
