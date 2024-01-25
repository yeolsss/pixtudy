import CustomHead from "@/SEO/CustomHead";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthForm from "@/components/auth/AuthForm";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import AuthHeroBanner from "@/components/auth/AuthHeroBanner";
import * as St from "@/components/auth/styles/authCommon.styles";
import useAuth from "@/zustand/authStore";
import Link from "next/link";

export default function FindPassword() {
  const { user } = useAuth();
  return (
    <>
      <CustomHead
        title={"비밀번호 재설정"}
        description={"비밀번호 재설정 페이지입니다."}
      />
      <St.AuthOuterContainer>
        <AuthHeroBanner formType="findPassword" />
        <AuthFormContainer>
          <St.ChangeAuthPage>
            비밀번호가 떠오르셨나요?
            <Link href={"/signin"}>지금 로그인하기</Link>
          </St.ChangeAuthPage>
          <h1>{user.display_name}님 안녕하세요</h1>
          <h2>
            비밀번호를 변경하고 <span>pixtudy</span>를 이용하세요
          </h2>
          <AuthForm formType="findPassword" />
          <AuthFooter />
        </AuthFormContainer>
      </St.AuthOuterContainer>
    </>
  );
}
