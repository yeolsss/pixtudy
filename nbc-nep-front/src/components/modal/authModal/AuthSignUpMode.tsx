export default function AuthSignUpMode({
  changeAuthMode,
}: {
  changeAuthMode: () => void;
}) {
  return (
    <span>
      이미 회원이신가요? <span onClick={changeAuthMode}>로그인</span>
    </span>
  );
}
