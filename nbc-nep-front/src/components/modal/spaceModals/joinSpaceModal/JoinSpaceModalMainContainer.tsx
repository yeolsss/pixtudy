import ModalHeader from "@/components/common/modal/ModalHeader";
import InvitationCodeForm from "@/components/spaces/JoinSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { StFlexColumn } from "@/components/spaces/styles/spaceCommon.styles";
import { Procedure } from "@/components/spaces/types/space.types";
import useModal from "@/hooks/modal/useModal";
import useSpace from "@/zustand/spaceStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function JoinSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const { resetJoinSpaceInfo } = useSpace();
  const { closeModal } = useModal();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleCloseModal = () => {
    closeModal();
    resetJoinSpaceInfo();
  };

  return (
    <StModalContainer>
      <ModalHeader text={"스페이스 입장하기"} handler={handleCloseModal} />
      <StModalJoinSpaceContents>
        {procedure === FORM_SPACE ? (
          <StDiv>
            <ProfilePreview setProcedure={setProcedure} />
            <InvitationCodeForm
              handleSubmit={handleSubmit}
              register={register}
              reset={reset}
              isValid={isValid}
              errors={errors}
            />
          </StDiv>
        ) : (
          <ProfileForm
            watch={watch}
            setProcedure={setProcedure}
            handleSubmit={handleSubmit}
            register={register}
            isValid={isValid}
            errors={errors}
            mode="joinSpace"
          />
        )}
      </StModalJoinSpaceContents>
    </StModalContainer>
  );
}

const StDiv = styled(StFlexColumn)`
  gap: ${(props) => props.theme.spacing[24]};
`;

export const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2400;
  background: white;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  width: ${(props) => props.theme.unit[460]};
  padding: ${(props) => props.theme.spacing[32]};
  padding-top: 0;
  height: 100%;
`;

const StModalJoinSpaceContents = styled(StModalContents)`
  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${(props) => props.theme.spacing[16]};
  }
`;
