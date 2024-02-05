import { AuthFormType } from "@/types/auth.types";
import Image from "next/image";
import Link from "next/link";
import AuthHeroNotice from "./AuthHeroNotice";
import { IMAGE_ARRAY } from "./constants/constants";
import { generateRandomIndex } from "./utils/authUtils";
import { StHeroBanner } from "./styles/authHeroBanner.styles";

interface Props {
  formType: AuthFormType;
}

export default function AuthHeroBanner({ formType }: Props) {
  const randomIndex = generateRandomIndex(IMAGE_ARRAY.length);
  return (
    <StHeroBanner $formType={formType}>
      <Link href="/">pixtudy</Link>
      <Image alt="auth-hero" src={IMAGE_ARRAY[randomIndex]} />
      <AuthHeroNotice formType={formType} />
    </StHeroBanner>
  );
}
