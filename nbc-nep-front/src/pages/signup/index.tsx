import React, { ReactElement } from "react";
import * as St from "@/components/auth/styles/authCommon.styles";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import Link from "next/link";
import SocialLogin from "@/components/auth/SocialLogin";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthDivider from "@/components/auth/AuthDivider";
import CustomHead from "@/SEO/CustomHead";

export function SignUp() {
  return (
    <>
      <CustomHead title={"회원가입"} description={"회원가입 페이지입니다."} />
      <St.AuthOuterContainer>
        <AuthFormContainer>
          <St.ChangeAuthPage>
            이미 계정이 있나요?
            <Link href={"/signin"}>지금 로그인하기</Link>
          </St.ChangeAuthPage>
          <h1>같이 공부 시작해요!</h1>
          <SocialLogin subText="SNS로 3초 만에 시작하기" />
          <AuthDivider />
          <AuthForm formType="signUp" />
          <AuthFooter />
        </AuthFormContainer>
        <AuthHeroBanner formType="signUp" />
      </St.AuthOuterContainer>
    </>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignUp;