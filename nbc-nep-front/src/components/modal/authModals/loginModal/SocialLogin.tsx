import { SocialLoginType, loginHandler } from "@/api/auth";

const socialLoginButtons = [
  { text: "구글", platform: "google" },
  { text: "깃허브", platform: "github" },
  { text: "카카오", platform: "kakao" },
];

export default function SocialLogin() {
  const HandleSocialLogin = (platform: SocialLoginType) => {
    loginHandler({ platform });
  };

  return (
    <div>
      {socialLoginButtons.map((btn) => {
        return (
          <button
            key={btn.platform}
            onClick={() => HandleSocialLogin(btn.platform as SocialLoginType)}
          >
            {btn.text}
          </button>
        );
      })}
    </div>
  );
}
