import useConfirm from "@/hooks/confirm/useConfirm";
import { useLogoutUser } from "@/hooks/query/useSupabase";
import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StCTAButton } from "../common/button/button.styles";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();
  const { user } = useAuth();
  const { openConfirmHandler } = useConfirm();

  const {
    isLogin,
    user: { display_name },
  } = useAuth();

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
    <>
      <StNavContainer>
        <div>
          <Link href="/">Pixtudy</Link>
          <StNavButton>서비스 소개</StNavButton>
          <StNavButton>고객지원</StNavButton>
        </div>
        <div>
          {isLogin && <p>{display_name}</p>}
          {currentButton.map((btn, index) => (
            <StNavButton key={index} onClick={btn.handler}>
              {btn.text}
            </StNavButton>
          ))}
          <StCTAButton onClick={handleToDashboard}>Dashboard</StCTAButton>
        </div>
      </StNavContainer>
    </>
  );
}

const StNavContainer = styled.header`
  display: flex;
  width: 100%;
  height: ${(props) => props.theme.unit[96]}px;
  padding: ${(props) => props.theme.spacing[24]};
  justify-content: space-between;
  align-items: center;
  font-family: var(--sub-font);

  a {
    display: block;
    color: ${(props) => props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }

  div {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[32]};
  }

  p {
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
    font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
    color: ${(props) => props.theme.color.text.primary};
    font-family: var(--sub-font);
    letter-spacing: ${(props) => props.theme.body.lg.regular.letterSpacing};
  }
`;

const StNavButton = styled.button`
  border: none;
  padding: 0;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  font-weight: ${(props) => props.theme.body.lg.regular.fontWeight};
  color: ${(props) => props.theme.color.text.disabled};
  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }
`;
