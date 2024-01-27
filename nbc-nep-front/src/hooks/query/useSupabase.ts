import {
  forgottenPasswordHandler,
  getOtherUserHandler,
  getSession,
  logoutHandler,
  signInHandler,
  signUpHandler,
  updateUserPasswordHandler,
} from "@/api/supabase/auth";
import {
  checkDmChannel,
  checkDmChannelArgs,
  getDmChannelMessages,
  getDmChannelMessagesReturns,
  getLastDmMessageList,
  getUserSpaces,
  readDmMessage,
  sendMessage,
  sendMessageArgs,
} from "@/api/supabase/dm";
import {
  createSpaceHandler,
  getSpaceData,
  joinSpaceHandler,
  removeSpace as removeSpaceSupabase,
  updateSpace as updateSpaceSupabase,
} from "@/api/supabase/space";
import { useCustomQuery } from "@/hooks/tanstackQuery/useCustomQuery";
import { Database, Tables } from "@/supabase/types/supabase";
import { Space_members } from "@/supabase/types/supabase.tables.type";
import { authValidation } from "@/utils/authValidate";
import useAuth from "@/zustand/authStore";
import { Session } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* Auth */
/* user */
// signUp
export function useSignUpUser() {
  const { mutate: signUp } = useMutation({
    mutationFn: signUpHandler,
    onError: (error) => {
      // TODO: error메시지 핸들링 필요
      authValidation(error.message, "signUp");
    },
  });
  return signUp;
}
// Login
export function useSignInUser() {
  const { mutate: signIn } = useMutation({
    mutationFn: signInHandler,
    onError: (error) => {
      authValidation(error.message, "signIn");
    },
  });
  return signIn;
}
// Logout
export function useLogoutUser() {
  const { mutate: logout } = useMutation({
    mutationFn: logoutHandler,
    onError: (error) => {
      console.log("로그아웃에러: ", error);
    },
  });
  return logout;
}

// 특정유저의 정보를 가져오는 함수
export function useGetOtherUserInfo(otherUserId: string) {
  const getOtherUserOptions = {
    queryKey: ["otherUser", otherUserId],
    queryFn: () => getOtherUserHandler(otherUserId),
    queryOptions: { staleTime: Infinity },
    enabled: !!otherUserId,
  };

  return useCustomQuery<Tables<"users"> | null, Error>(getOtherUserOptions);
}

export function useGetSessionInfo() {
  const getSessionOptions = {
    queryKey: ["session"],
    queryFn: async () => {
      const result = await getSession();
      return result.session; // 여기서 session 속성을 직접 반환
    },
    queryOption: { staleTime: Infinity },
  };
  return useCustomQuery<Session | null, Error>(getSessionOptions);
}

/* space */

export function useCreateSpace(
  handleOnSuccess: (data: Tables<"spaces">) => void
) {
  const client = useQueryClient();

  const {
    mutate: createSpace,
    isSuccess: createSuccess,
    isError: createError,
  } = useMutation({
    mutationFn: createSpaceHandler,
    onSuccess: (data) => {
      handleOnSuccess(data);
      client.invalidateQueries({ queryKey: ["userSpaces"] });
    },
    onError: (error) => {
      console.error("createSpaceError: ", error);
    },
  });
  return { createSpace, createSuccess, createError };
}

// insert userData to space_members
export function useJoinSpace() {
  const {
    mutate: joinSpace,
    isSuccess: joinSuccess,
    isError: joinError,
  } = useMutation({
    mutationFn: joinSpaceHandler,
    onError: (error) => {
      console.error("joinSpaceError: ", error);
    },
  });
  return { joinSpace, joinSuccess, joinError };
}

export function useGetSpace() {
  const client = useQueryClient();
  const { mutate: getSpace } = useMutation({
    mutationFn: (code: string) => getSpaceData(code),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userSpaces"] });
    },
    onError: (error: any) => console.error(error),
  });
  return getSpace;
}

// get current user spaces
export function useGetUserSpaces(currentUserId: string) {
  const getUserSpacesOptions = {
    queryKey: ["userSpaces", currentUserId],
    queryFn: () => getUserSpaces(currentUserId),
    enabled: !!currentUserId,
  };
  return useCustomQuery<Space_members[], Error>(getUserSpacesOptions);
}

export function useRemoveSpace(onSuccess: () => void) {
  const client = useQueryClient();
  const {
    mutate: removeSpace,
    isSuccess: isRemovingSuccess,
    isError: isRemovingError,
  } = useMutation({
    mutationFn: removeSpaceSupabase,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userSpaces"] });
      onSuccess();
    },
    onError: (error) => {
      console.error("remove space error: ", error);
    },
  });
  return { removeSpace, isRemovingSuccess, isRemovingError };
}

export function useUpdateSpace() {
  const client = useQueryClient();
  const {
    mutate: updateSpace,
    isSuccess: isUpdatingSuccess,
    isError: isUpdatingError,
  } = useMutation({
    mutationFn: updateSpaceSupabase,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["userSpaces"] });
    },
    onError: (error) => {
      console.error("update space error: ", error);
    },
  });
  return { updateSpace, isUpdatingSuccess, isUpdatingError };
}

/* dm */
// check dmChannel with otherUser
export function useGetDmChannel({
  receiverId,
  spaceId,
}: Omit<checkDmChannelArgs, "currentUserId">) {
  const {
    user: { id: currentUserId },
  } = useAuth();
  const getDmChannelOptions = {
    queryKey: ["dmChannel", receiverId],
    queryFn: () => checkDmChannel({ receiverId, currentUserId, spaceId }),
    enabled: !!currentUserId,
  };
  return useCustomQuery<string | null, Error>(getDmChannelOptions);
}

// Dm채널 유무 확인 후 기존 메시지 가져오기
export function useGetDmMessages(dmChannel: string | null) {
  const getDmMessagesOptions = {
    queryKey: ["dmMessages", dmChannel],
    queryFn: () => getDmChannelMessages(dmChannel),
    enabled: !!dmChannel,
  };
  return useCustomQuery<getDmChannelMessagesReturns[], Error>(
    getDmMessagesOptions
  );
}

// 메시지 보내기
export function useSendMessage() {
  const {
    user: { id: currentUserId },
  } = useAuth();
  const { mutate: message } = useMutation({
    mutationFn: ({
      currentDmChannel,
      message,
      receiverId,
      spaceId,
    }: Omit<sendMessageArgs, "currentUserId">) =>
      sendMessage({
        currentDmChannel,
        message,
        receiverId,
        spaceId,
        currentUserId,
      }),
    onError: (error) => {
      console.log("sendError: ", error);
    },
  });
  return message;
}

export function useGetLastDMList(spaceId: string, userId: string) {
  const queryOptions = {
    queryKey: ["lastDMList"],
    queryFn: async () => {
      const result = await getLastDmMessageList(spaceId, userId);
      return result || [];
    },
    enabled: !!spaceId && !!userId,
    queryOptions: { staleTime: Infinity },
  };

  return useCustomQuery<
    Database["public"]["Functions"]["get_last_dm_message_list"]["Returns"],
    Error
  >(queryOptions);
}

export function useReadDMMessage() {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: readDmMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lastDMList"] });
    },
  });

  return { mutate, isError, isPending };
}

export function useForgetPassword() {
  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: forgottenPasswordHandler,
  });

  return { forgetPassword, isPending };
}

export function useUpdateUserPw() {
  const { mutate: updateUser } = useMutation({
    mutationFn: updateUserPasswordHandler,
    onError: (error) => {
      authValidation(error.message, "changePassword");
    },
  });
  return updateUser;
}
