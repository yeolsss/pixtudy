import { good } from "@/assets/auth";
import { AuthFormType } from "@/types/auth.types";
import Image from "next/image";
import { TIPS_ARRAY } from "./constants/constants";
import { generateRandomIndex } from "./utils/authUtils";
import { StNoticeContainer } from "./styles/authHeroBanner.styles";

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
