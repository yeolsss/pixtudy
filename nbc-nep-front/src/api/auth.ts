import { supabase } from "@/libs/supabase";
/**
 * 회원가입
 */
type signUpHandlerArgs = {
  email: string;
  password: string;
  nickname: string;
};
export const signUpHandler = async ({
  email,
  password,
  nickname,
}: signUpHandlerArgs) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nickname,
      },
    },
  });
  if (signUpError) return signUpError;
  return signUpData;
};

/**
 * 로그인
 * 일반 로그인과 소셜로그인 통합
 */

export type SocialLoginType = "email" | "google" | "kakao" | "github";

type LoginHandlerArgs = {
  email?: string;
  password?: string;
  platform: SocialLoginType;
};

export const loginHandler = async ({
  email,
  password,
  platform,
}: LoginHandlerArgs) => {
  let data, error;

  switch (platform) {
    case "email":
      if (email && password)
        ({ data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        }));
      break;
    case "google":
    case "kakao":
    case "github":
      ({ data, error } = await supabase.auth.signInWithOAuth({
        provider: platform,
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      }));
      break;
  }

  if (error) throw error;
  return data;
};
