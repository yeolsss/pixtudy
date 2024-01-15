import { loginHandler, logoutHandler, signUpHandler } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

/* Auth */
/* user */
export function useSignUpUser() {
  const { mutate: signUp } = useMutation({
    mutationFn: signUpHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return signUp;
}

export function useLoginUser() {
  const { mutate: login } = useMutation({
    mutationFn: loginHandler,
    onError: (error) => {
      console.error("로그인에러:", error);
    },
  });
  return login;
}

export function useLogoutUser() {
  const { mutate: logout } = useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {},
    onError: () => {},
  });
  return logout;
}
