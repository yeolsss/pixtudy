import { good } from "@/assets/auth";
import { AuthFormType } from "@/types/auth.types";
import Image from "next/image";
import styled from "styled-components";
import { TIPS_ARRAY } from "./constants/constants";
import { generateRandomIndex } from "./utils/authUtils";

interface Props {
  formType: AuthFormType;
}
export default function AuthHeroNotice({ formType }: Props) {
  const randomIndex = generateRandomIndex(TIPS_ARRAY.length);
  return (
    <StNoticeContainer $formType={formType}>
      <section>
        <Image alt="good" src={good} />
        <span>Tip !</span>
      </section>
      <p>{TIPS_ARRAY[randomIndex]}</p>
    </StNoticeContainer>
  );
}

const StNoticeContainer = styled.div<{ $formType: AuthFormType }>`
  background: ${(props) =>
    props.$formType === "signUp" ? "#fff2f221" : "#00000020"};
  border-radius: ${(props) => props.theme.border.radius[12]};
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: absolute;
  /* margin-top: ${(props) => props.theme.spacing["20"]}; */
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
