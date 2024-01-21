import ModalHeader from "@/components/common/modal/ModalHeader";
import InvitationCodeForm from "@/components/spaces/InvitationCodeForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import SpacePreview from "@/components/spaces/SpacePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure } from "@/components/spaces/types/space.types";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { toggleJoinSpaceModal } from "@/redux/modules/modalSlice";
import { resetJoinSpaceInfo } from "@/redux/modules/spaceSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function JoinSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const handleCloseModal = () => {
    dispatch(toggleJoinSpaceModal());
    dispatch(resetJoinSpaceInfo());
  };

  return (
    <StModalContainer>
      <ModalHeader text={"스페이스 입장하기"} handler={handleCloseModal} />
      <StModalContents></StModalContents>
      {procedure === FORM_SPACE ? (
        <>
          <ProfilePreview setProcedure={setProcedure} />
          <InvitationCodeForm
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            errors={errors}
          />
          <SpacePreview setProcedure={setProcedure} />
        </>
      ) : (
        <ProfileForm
          setProcedure={setProcedure}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          mode="joinSpace"
        />
      )}
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
