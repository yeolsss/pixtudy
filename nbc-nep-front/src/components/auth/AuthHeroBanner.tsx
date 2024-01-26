import { useRouter } from "next/router";
import styled from "styled-components";
import { AuthFormType } from "./utils/authUtils";

interface Props {
  formType: AuthFormType;
}
export default function AuthHeroBanner({ formType }: Props) {
  const router = useRouter();
  const handleToHome = () => router.push("/");
  return (
    <StHeroBannerTemp $formType={formType}>
      <span onClick={handleToHome}>pixtudy</span>
    </StHeroBannerTemp>
  );
}
const StHeroBannerTemp = styled.div<{ $formType: AuthFormType }>`
  background-color: ${(props) =>
    props.$formType === "signUp"
      ? props.theme.color.bg.interactive.primary
      : "transparent"};
  width: 50%;
  position: relative;

  & > span {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: ${(props) => props.theme.spacing["48"]};
    left: ${(props) =>
      props.$formType === "signUp" ? "unset" : props.theme.spacing["48"]};
    right: ${(props) =>
      props.$formType === "signUp" ? props.theme.spacing["48"] : "unset"};
    color: ${(props) =>
      props.$formType === "signUp"
        ? props.theme.color.text.interactive.inverse
        : props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }
`;
