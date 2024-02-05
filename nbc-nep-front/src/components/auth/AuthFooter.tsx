import Link from "next/link";
import { StAuthFooter } from "./styles/authFooter.styles";

export default function AuthFooter() {
  return (
    <StAuthFooter>
      SNS 로그인 시 <Link href="/">회원가입 이용약관</Link>,
      <Link href="/">서비스 이용약관</Link>,
      <Link href="/">개인정보처리방침</Link>,
      <Link href="/">마케팅 이용약관</Link>에 동의 하는 것으로 간주 합니다.
    </StAuthFooter>
  );
}
