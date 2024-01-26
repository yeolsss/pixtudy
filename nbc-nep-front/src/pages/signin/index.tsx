import CustomHead from "@/SEO/CustomHead";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthForm from "@/components/auth/AuthForm";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import SocialLogin from "@/components/auth/SocialLogin";
import * as St from "@/components/auth/styles/authCommon.styles";
import { pathValidation } from "@/utils/middlewareValidate";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
export function SignIn() {
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.message === "string" && !!router.query.message)
      pathValidation(router.query.message);
  }, [router.query]);
  return (
    <>
      <CustomHead title={"로그인"} description={"로그인 페이지입니다."} />
      <St.AuthOuterContainer>
        <AuthHeroBanner formType="signIn" />
        <AuthFormContainer>
          <St.ChangeAuthPage>
            아직 계정을 만들기 전인가요?
            <Link href={"/signup"}>지금 가입하기</Link>
          </St.ChangeAuthPage>
          <h1>어서오세요 :)</h1>
          <SocialLogin subText="SNS 로그인" />
          <AuthDivider />
          <AuthForm formType="signIn" />
          <AuthFooter />
        </AuthFormContainer>
      </St.AuthOuterContainer>
    </>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignIn;
