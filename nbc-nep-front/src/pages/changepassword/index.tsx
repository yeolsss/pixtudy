import CustomHead from "@/SEO/CustomHead";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthForm from "@/components/auth/AuthForm";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import * as St from "@/components/auth/styles/authCommon.styles";
import { useLogoutUser } from "@/hooks/query/useSupabase";
import useAuth from "@/zustand/authStore";
import Link from "next/link";
import { useEffect } from "react";

export default function ChangePassword() {
  const { user } = useAuth();
  const logout = useLogoutUser();
  useEffect(() => {
    return () => {
      logout();
    };
  }, []);
  return (
    <>
      <CustomHead
        title={"비밀번호 재설정"}
        description={"비밀번호 재설정 페이지입니다."}
      />
      <St.AuthOuterContainer>
        <AuthHeroBanner formType="changePassword" />
        <AuthFormContainer>
          <St.ChangeAuthPage>
            비밀번호가 떠오르셨나요?
            <Link href={"/signin"}>지금 로그인하기</Link>
          </St.ChangeAuthPage>
          <h1>
            {user.display_name
              ? `${user.display_name}님 안녕하세요`
              : "세션이 만료되었습니다."}
          </h1>
          <h2>
            비밀번호를 변경하고 <span>pixtudy</span>를 이용하세요
          </h2>
          <AuthForm formType="changePassword" />
          <AuthFooter />
        </AuthFormContainer>
      </St.AuthOuterContainer>
    </>
  );
}
