import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function JoinSpaceModalMainContainer() {
  const { id: userId, display_name: displayName } = useAppSelector(
    (state) => state.authSlice.user
  );
  const [isValidSpace, setIsValidSpace] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 두 개 철차로 진행된다. 1. 초대코드 검증, 2. 닉네임 및 아바타 선택
  // input에 초대코드를 입력하고 버튼을 클릭할시 spaces table에 검색해서 있으면 OK
  // 닉네임과 아바타 선택은 한 화면에서 진행. 그러면? 초대커드 검증 여붕 따라 렌더링

  return (
    <div>
      <h2>Space에 입장하기</h2>
      {isValidSpace === false ? <form>hey</form> : <div>why</div>}
    </div>
  );
}
