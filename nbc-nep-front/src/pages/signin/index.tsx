import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import React from "react";
import * as St from "@/components/auth/styles/authCommon.styles";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { ReactElement } from "react";
import FindPasswordModal from "@/components/modal/findPasswordModal/FindPasswordModal";
import { useAppSelector } from "@/hooks/useReduxTK";
import ModalPortal from "@/components/modal/ModalPortal";

export function SignIn() {
  const isFindPasswordModalOpen = useAppSelector(
    (state) => state.modalSlice.isFindPasswordModalOpen
  );
  return (
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
      {isFindPasswordModalOpen && (
        <ModalPortal>
          <FindPasswordModal />
        </ModalPortal>
      )}
    </St.AuthOuterContainer>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignIn;
