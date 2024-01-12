import { LoginPlatformType, loginHandler } from "@/api/supabase/auth";

const socialLoginButtons = [
  { text: "구글", platform: "google" },
  { text: "깃허브", platform: "github" },
  { text: "카카오", platform: "kakao" },
];

export default function SocialLogin() {
  const handleSocialLogin = (platform: LoginPlatformType) => {
    loginHandler({ platform });
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
