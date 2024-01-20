import { supabase } from "@/supabase/supabase";

/**
 * Supabase 회원가입을 위한 함수
 * @param {string} email - 회원가입에 사용할 email
 * @param {string} password - 회원가입에 사용할 password
 * @param {string} nickname - 회원가입에 사용할 nickname
 * @returns 유저정보
 */
interface SignUpHandlerArgs {
  email: string;
  password: string;
  nickname: string;
}
export const signUpHandler = async ({
  email,
  password,
  nickname,
}: SignUpHandlerArgs) => {
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
 * Supabase 로그인을 위한 함수
 * @param {string} email - 로그인에 사용할 email (선택적 입력가능)
 * @param {string} password - 로그인에 사용할 password (선택적 입력가능)
 * @param {LoginPlatformType(string union)} platform - 로그인 방식
 * @returns 유저정보
 */
export type LoginPlatformType = "email" | "google" | "kakao" | "github";

interface LoginHandlerArgs {
  email?: string;
  password?: string;
  platform: LoginPlatformType;
}

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

/**
 * Supabase 로그아웃을 위한 함수
 */
// 로그아웃
export const logoutHandler = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
