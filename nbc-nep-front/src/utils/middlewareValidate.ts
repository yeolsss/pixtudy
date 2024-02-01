import { toast } from "react-toastify";

export function pathValidation(errorMessage: string) {
  switch (errorMessage) {
    case "invalid_space":
      toast.error("허용되지 않은 스페이스입니다.");
      break;
    case "login_first":
      toast.error("로그인 먼저 진행하세요.");
      break;
    case "login_already":
      toast.error("이미 로그인 되어있습니다.");
      break;
    case "invalid_path":
      toast.error("허용되지 않은 경로 접근입니다.");
      break;
    case "mobile_error":
      toast.error("모바일 환경에서 접근이 불가능합니다.");
    case "duplicate":
      toast.error("중복 로그인이 감지됐습니다.");
      break;
    default:
      break;
  }
}
