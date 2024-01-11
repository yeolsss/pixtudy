import {
  getUserSessionHandler,
  loginHandler,
  logoutHandler,
  signUpHandler,
} from "@/api/supabase/auth";
import {
  getSpaceUsers,
  getUserDmChannel,
  getUserSpaces,
} from "@/api/supabase/dm";
import { useMutation } from "@tanstack/react-query";

/* Auth */
/* user */
// signUp
export function useSignUpUser() {
  const { mutate: signUp } = useMutation({
    mutationFn: signUpHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return signUp;
}
// Login
export function useLoginUser() {
  const { mutate: login } = useMutation({
    mutationFn: loginHandler,
    onError: (error) => {
      console.error("로그인에러:", error);
    },
  });
  return login;
}
// Logout
export function useLogoutUser() {
  const { mutate: logout } = useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return logout;
}

// get user session
export function useGetCurrentUser() {
  const { mutate: getUser } = useMutation({
    mutationFn: getUserSessionHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return getUser;
}

/* spaces */
// get current user spaces
export function useGetUserSpaces() {
  const { mutate: getUserSpacesInfo } = useMutation({
    mutationFn: getUserSpaces,
    onSuccess: () => {},
    onError: () => {},
  });
  return getUserSpacesInfo;
}

export function useGetCurrentSpaceUsers() {
  const { mutate: getCurrentSpaceUsers } = useMutation({
    mutationFn: getSpaceUsers,
    onSuccess: () => {},
    onError: () => {},
  });
  return getCurrentSpaceUsers;
}

// 유저의 활성화 된 모든 dm 채널 가져오기
export function useGetUserDMChannel() {
  const { mutate: getDmChannel } = useMutation({
    mutationFn: getUserDmChannel,
    onSuccess: () => {},
    onError: () => {},
  });
  return getDmChannel;
}
