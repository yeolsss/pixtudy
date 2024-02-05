import { AuthFormType } from "@/types/auth.types";
import styled from "styled-components";

export const StHeroBanner = styled.div<{ $formType: AuthFormType }>`
  background-color: ${(props) =>
    props.$formType === "signUp"
      ? props.theme.color.bg.interactive.primary
      : "transparent"};
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
    padding-bottom: ${(props) => props.theme.spacing["80"]};
  }

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const StNoticeContainer = styled.div<{ $formType: AuthFormType }>`
  background: ${(props) =>
    props.$formType === "signUp" ? "#fff2f221" : "#00000020"};
  border-radius: ${(props) => props.theme.border.radius[12]};
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: absolute;
  bottom: ${(props) => props.theme.spacing["48"]};
  color: ${(props) =>
    props.$formType === "signUp"
      ? props.theme.color.base.white
      : props.theme.color.text.interactive.secondary};
  font-family: var(--point-font);
  padding: ${(props) => props.theme.spacing["24"]};

  & > section {
    padding: ${(props) => props.theme.spacing["16"]};
    border-radius: ${(props) => props.theme.border.radius["12"]};
    display: flex;
    align-items: center;
    background: ${(props) =>
      props.$formType === "signUp"
        ? props.theme.color.bg.brand
        : props.theme.color.base.white};
    margin-bottom: ${(props) => props.theme.spacing["24"]};
    & > span {
      margin-left: ${(props) => props.theme.spacing["12"]};
      font-size: ${(props) => props.theme.unit["16"]};
      font-weight: bold;
    }
  }

  & > p {
    line-height: ${(props) => props.theme.spacing["32"]};
    font-size: ${(props) => props.theme.unit["20"]};
    word-break: keep-all;
  }
`;
