import { SignInPlatformType } from "@/api/supabase/auth";
import { useSignInUser } from "@/hooks/query/useSupabase";
import Image from "next/image";
import { StSocialLoginContainer } from "./styles/authSocialLogin.styles";
import { SOCIAL_LOGIN } from "./constants/constants";

interface Props {
  subText: string;
}
export default function SocialLogin({ subText }: Props) {
  const signIn = useSignInUser();

  const handleSocialLogin = (platform: SignInPlatformType) => {
    signIn({ platform });
  };

  return (
    <StSocialLoginContainer>
      <h2>{subText}</h2>
      <div>
        {SOCIAL_LOGIN.map((btn) => {
          return (
            <button
              type="button"
              key={btn.platform}
              onClick={() =>
                handleSocialLogin(btn.platform as SignInPlatformType)
              }
            >
              <Image src={btn.icon} alt="" />
              {btn.text}
            </button>
          );
        })}
      </div>
    </StSocialLoginContainer>
  );
}
