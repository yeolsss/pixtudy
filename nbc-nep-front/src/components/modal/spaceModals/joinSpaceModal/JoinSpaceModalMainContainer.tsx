import ModalHeader from "@/components/common/modal/ModalHeader";
import InvitationCodeForm from "@/components/spaces/JoinSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure } from "@/types/space.types";
import useModal from "@/hooks/modal/useModal";
import useSpaceStore from "@/zustand/spaceStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StModalContainer } from "../styles/spaceModalCommens.styles";
import {
  StDiv,
  StModalJoinSpaceContents,
} from "../styles/joinSpaceModal.styles";

export default function JoinSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const resetJoinSpaceInfo = useSpaceStore.use.resetJoinSpaceInfo();
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
      <ModalHeader text="스페이스 입장하기" handler={handleCloseModal} />
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
          />
        )}
      </StModalJoinSpaceContents>
    </StModalContainer>
  );
}
