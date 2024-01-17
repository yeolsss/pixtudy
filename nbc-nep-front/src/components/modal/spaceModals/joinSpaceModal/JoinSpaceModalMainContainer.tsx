import ProfileForm from "@/components/spaces/ProfileForm";
import { useJoinSpace } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { openJoinSpaceModal } from "@/redux/modules/modalSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InvitationCodeForm from "../../../spaces/InvitationCodeForm";

export default function JoinSpaceModalMainContainer() {
  const { id: userId, display_name: displayName } = useAppSelector(
    (state) => state.authSlice.user
  );
  const [spaceId, setSpaceId] = useState<string>("");
  const [isValidSpace, setIsValidSpace] = useState<boolean>(false);
  const join = useJoinSpace();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // 두 개 철차로 진행된다. 1. 초대코드 검증, 2. 닉네임 및 아바타 선택
  // input에 초대코드를 입력하고 버튼을 클릭할시 spaces table에 검색해서 있으면 OK
  // 닉네임과 아바타 선택은 한 화면에서 진행. 그러면? 초대커드 검증 여부에 따라 렌더링

  const handleCancelBtnClick = () => {
    dispatch(openJoinSpaceModal());
  };

  return (
    <StModalContainer>
      <h2>Space에 입장하기</h2>
      {!isValidSpace ? (
        <InvitationCodeForm
          spaceId={spaceId}
          handleSubmit={handleSubmit}
          handleCancelBtnClick={handleCancelBtnClick}
          setIsValidSpace={setIsValidSpace}
          setSpaceId={setSpaceId}
          register={register}
          reset={reset}
          errors={errors}
        />
      ) : (
        <ProfileForm
          spaceId={spaceId}
          defaultDisplayName={displayName!}
          handleSubmit={handleSubmit}
          handleCancelBtnClick={handleCancelBtnClick}
          register={register}
          errors={errors}
        />
      )}
    </StModalContainer>
  );
}

const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  width: 50rem;
  height: 50rem;
`;
