import ModalHeader from "@/components/common/modal/ModalHeader";
import CreateSpaceForm from "@/components/spaces/CreateSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure } from "@/components/spaces/types/space.types";
import useModal from "@/hooks/modal/useModal";
import useSpaceStore from "@/zustand/spaceStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  StModalContainer,
  StModalContents,
} from "../joinSpaceModal/JoinSpaceModalMainContainer";

export default function CreateSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const resetCreateSpaceInfo = useSpaceStore.use.resetCreateSpaceInfo();
  const { closeModal } = useModal();

  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const handleCloseModal = () => {
    closeModal();
    resetCreateSpaceInfo();
  };

  return (
    <StModalContainer>
      <ModalHeader text="스페이스 만들기" handler={handleCloseModal} />
      <StModalContents>
        {procedure === FORM_SPACE ? (
          <>
            <ProfilePreview setProcedure={setProcedure} />
            <CreateSpaceForm
              handleSubmit={handleSubmit}
              register={register}
              getValues={getValues}
              isValid={isValid}
              errors={errors}
            />
          </>
        ) : (
          <ProfileForm
            watch={watch}
            setProcedure={setProcedure}
            handleSubmit={handleSubmit}
            register={register}
            isValid={isValid}
            mode="createSpace"
            errors={errors}
          />
        )}
      </StModalContents>
    </StModalContainer>
  );
}
