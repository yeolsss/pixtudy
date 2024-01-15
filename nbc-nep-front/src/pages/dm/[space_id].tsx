import ConnectedUser from "@/components/dm/ConnectedUser";
import { ReactElement } from "react";
import Dashboard from "../dashboard";

export default function Chat() {
  return (
    <div>
      <h1>채팅 테스트 페이지입니다</h1>
      <p>가정 : 메타버스 환경</p>
      <ConnectedUser />
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return page;
};
