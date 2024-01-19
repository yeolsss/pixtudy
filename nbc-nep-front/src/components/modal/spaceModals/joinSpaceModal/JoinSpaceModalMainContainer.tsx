import ModalHeader from "@/components/common/ModalHeader";
import ProfileForm from "@/components/spaces/ProfileForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { toggleJoinSpaceModal } from "@/redux/modules/modalSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InvitationCodeForm from "../../../spaces/InvitationCodeForm";
import { Procedure } from "../createSpaceModal/CreateSpaceModalMainContainer";

export default function JoinSpaceModalMainContainer() {
  const { id: userId, display_name: displayName } = useAppSelector(
    (state) => state.authSlice.user
  );
  const [spaceId, setSpaceId] = useState<string>("");
  const [procedure, setProcedure] = useState<Procedure>("1");
  const [isValidSpace, setIsValidSpace] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // 두 개 철차로 진행된다. 1. 초대코드 검증, 2. 닉네임 및 아바타 선택
  // input에 초대코드를 입력하고 버튼을 클릭할시 spaces table에 검색해서 있으면 OK
  // 닉네임과 아바타 선택은 한 화면에서 진행. 그러면? 초대커드 검증 여부에 따라 렌더링

  return (
    <StModalContainer>
      <ModalHeader
        text={"스페이스 입장하기"}
        handler={() => dispatch(toggleJoinSpaceModal())}
      />
      <StModalContents>
        {procedure === "1" ? (
          <InvitationCodeForm
            setProcedure={setProcedure}
            spaceId={spaceId}
            handleSubmit={handleSubmit}
            setIsValidSpace={setIsValidSpace}
            setSpaceId={setSpaceId}
            register={register}
            reset={reset}
            errors={errors}
          />
        ) : (
          <ProfileForm
            setProcedure={setProcedure}
            spaceId={spaceId}
            defaultDisplayName={displayName!}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            mode="joinSpace"
          />
        )}
      </StModalContents>
    </StModalContainer>
  );
}

export const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  width: 50rem;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  padding: ${(props) => props.theme.spacing[24]};
  padding-top: 0;
  height: 100%;
`;
