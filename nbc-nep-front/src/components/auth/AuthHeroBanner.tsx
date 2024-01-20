import React from "react";
import styled from "styled-components";
import { AuthFormType } from "./utils/authUtils";
import { useRouter } from "next/router";

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
    props.$formType === "signIn"
      ? "transparent"
      : props.theme.color.bg.interactive.primary};
  width: 50%;
  position: relative;

  & > span {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: ${(props) => props.theme.spacing["48"]};
    left: ${(props) =>
      props.$formType === "signIn" ? props.theme.spacing["48"] : "unset"};
    right: ${(props) =>
      props.$formType === "signIn" ? "unset" : props.theme.spacing["48"]};
    color: ${(props) =>
      props.$formType === "signIn"
        ? props.theme.color.text.interactive.primary
        : props.theme.color.text.interactive.inverse};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }
`;
