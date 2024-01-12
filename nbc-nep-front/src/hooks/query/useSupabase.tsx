import {
  getOtherUserHandler,
  getUserSessionHandler,
  loginHandler,
  logoutHandler,
  signUpHandler,
} from "@/api/supabase/auth";
import {
  checkDmChannel,
  getDmChannelMessages,
  getSpaceUsers,
  getUserDmChannel,
  getUserSpaces,
  sendMessage,
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

// 특정유저의 정보를 가져오는 함수
export function useGetOtherUserInfo() {
  const { mutate: getOtherUser } = useMutation({
    mutationFn: getOtherUserHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return getOtherUser;
}

/* dm */
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

//
export function useGetDmChannel() {
  const { mutate: dmChannel } = useMutation({
    mutationFn: checkDmChannel,
    onSuccess: () => {},
    onError: () => {},
  });
  return dmChannel;
}
// Dm채널 유무 확인 후 기존 메시지 가져오기
export function useGetDmMessages() {
  const { mutate: dmMessages } = useMutation({
    mutationFn: getDmChannelMessages,
    onSuccess: () => {},
    onError: () => {},
  });
  return dmMessages;
}

// 메시지 보내기
export function useSendMessage() {
  const { mutate: message } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {},
    onError: () => {},
  });
  return message;
}
