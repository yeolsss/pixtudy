import useConfirm from "@/hooks/confirm/useConfirm";
import { useLogoutUser } from "@/hooks/query/useSupabase";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuthStore from "@/zustand/authStore";
import { useRouter } from "next/router";
import { StCTAButton } from "../common/button/button.styles";
import {
  StLogo,
  StNavButton,
  StNavContainer,
  StNavLink,
  StNavWrapper,
} from "./styles/header.styles";

export const GOOGLE_FORM_LINK = "https://forms.gle/mDpaz6tnSpTwcLVp7";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();
  const user = useAuthStore.use.user();
  const { openConfirmHandler } = useConfirm();

  const isLogin = useAuthStore.use.isLogin();
  const { display_name: displayName } = useAuthStore.use.user();

  const handleToLoginPage = () => {
    router.push("/signin");
  };

  const handleToSignUpPage = () => {
    router.push("/signup");
  };

  const handleLogout = async () => {
    const result = await openConfirmHandler({
      title: "로그아웃",
      message: " 정말 로그아웃 하시겠습니까?",
      confirmButtonText: "네, 로그아웃할게요",
      denyButtonText: "아니요, 더 둘러볼게요",
    });
    if (result) logout();
  };

  const handleToDashboard = () => {
    if (user.id) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
      pathValidation("login_first");
    }
  };

  const loginModeButton = [{ text: "로그아웃", handler: handleLogout }];
  const logoutModeButton = [
    { text: "LOGIN", handler: handleToLoginPage },
    { text: "SIGNUP", handler: handleToSignUpPage },
  ];
  const currentButton = isLogin ? loginModeButton : logoutModeButton;
  return (
    <StNavWrapper>
      <StNavContainer>
        <div>
          <StLogo href="/">
            <h1>Pixtudy</h1>
          </StLogo>
          <StNavLink href="/">서비스 소개</StNavLink>
          <StNavLink as="a" href={GOOGLE_FORM_LINK}>
            고객지원
          </StNavLink>
        </div>
        <div>
          {isLogin && <p>{displayName}</p>}
          {currentButton.map((btn) => (
            <StNavButton type="button" key={btn.text} onClick={btn.handler}>
              {btn.text}
            </StNavButton>
          ))}
          <StCTAButton onClick={handleToDashboard}>Dashboard</StCTAButton>
        </div>
      </StNavContainer>
    </StNavWrapper>
  );
}
