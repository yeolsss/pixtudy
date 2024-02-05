import Link from 'next/link'
import styledComponents from 'styled-components'

const styled = styledComponents

const StAuthFooter = styled.footer`
  width: 93%;
  margin-top: ${(props) => props.theme.spacing['16']};
  font-size: ${(props) => props.theme.unit['12']};
  line-height: ${(props) => props.theme.spacing['19-5']};
  color: #5a5a5a;
  word-break: keep-all;
  text-align: center;

  & a {
    color: inherit;
    text-decoration: underline;
  }
`

export default function AuthFooter() {
  return (
    <StAuthFooter>
      SNS 로그인 시 <Link href="#">회원가입 이용약관</Link>,
      <Link href="#">서비스 이용약관</Link>,
      <Link href="#">개인정보처리방침</Link>,
      <Link href="#">마케팅 이용약관</Link>에 동의 하는 것으로 간주 합니다.
    </StAuthFooter>
  )
}
