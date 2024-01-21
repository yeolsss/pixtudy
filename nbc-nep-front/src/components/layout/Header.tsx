import { useLogoutUser } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StCTAButton } from "../common/button/button.styles";

export default function Header() {
  const router = useRouter();
  const logout = useLogoutUser();

  const authStatus = useAppSelector((state) => state.authSlice);

  const handleToLoginPage = () => {
    router.push("/signin");
  };

  const handleToSignUpPage = () => {
    router.push("/signup");
  };

  const handleLogout = () => {
    logout();
  };

  const handleToDashboard = () => {
    router.push("/dashboard");
  };

  const loginModeButton = [{ text: "로그아웃", handler: handleLogout }];
  const logoutModeButton = [
    { text: "LOGIN", handler: handleToLoginPage },
    { text: "SIGNUP", handler: handleToSignUpPage },
  ];
  const currentButton = authStatus.isLogin ? loginModeButton : logoutModeButton;
  console.log(authStatus);
  return (
    <>
      <StNavContainer>
        <div>
          <span onClick={() => router.push("/")}>Pixtudy</span>
          <StNavButton>서비스 소개</StNavButton>
          <StNavButton>고객지원</StNavButton>
        </div>
        <div>
          {authStatus?.isLogin && <p>{authStatus.user.display_name}</p>}
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

  span {
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
