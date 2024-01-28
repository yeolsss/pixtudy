import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import AuthHeroNotice from "./AuthHeroNotice";
import {
  AuthFormType,
  generateRandomIndex,
  imageArray,
} from "./utils/authUtils";
interface Props {
  formType: AuthFormType;
}
export default function AuthHeroBanner({ formType }: Props) {
  const randomIndex = generateRandomIndex(imageArray.length);
  return (
    <StHeroBannerTemp $formType={formType}>
      <Link href={"/"}>pixtudy</Link>
      <Image alt="auth-hero" src={imageArray[randomIndex]} />
      <AuthHeroNotice formType={formType} />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  & > a {
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

  & > img {
    width: 70%;
    height: auto;
  }
`;
