import { LoginPlatformType } from "@/api/supabase/auth";
import { useLoginUser } from "@/hooks/query/useSupabase";

const socialLoginButtons = [
  { text: "구글", platform: "google" },
  { text: "깃허브", platform: "github" },
  { text: "카카오", platform: "kakao" },
];

export default function SocialLogin() {
  const login = useLoginUser();

  const handleSocialLogin = (platform: LoginPlatformType) => {
    login({ platform });
  };

  return (
    <div>
      {socialLoginButtons.map((btn) => {
        return (
          <button
            key={btn.platform}
            onClick={() => handleSocialLogin(btn.platform as LoginPlatformType)}
          >
            {btn.text}
          </button>
        );
      })}
    </div>
  );
}
