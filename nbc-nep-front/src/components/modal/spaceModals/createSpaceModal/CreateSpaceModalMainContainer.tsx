import ModalHeader from "@/components/common/modal/ModalHeader";
import CreateSpaceForm from "@/components/spaces/CreateSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure } from "@/components/spaces/types/space.types";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { toggleCreateSpaceModal } from "@/redux/modules/modalSlice";
import useSpace from "@/zustand/spaceStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  StModalContainer,
  StModalContents,
} from "../joinSpaceModal/JoinSpaceModalMainContainer";

export default function CreateSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const dispatch = useAppDispatch();
  const { resetCreateSpaceInfo } = useSpace();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const handleCloseModal = () => {
    dispatch(toggleCreateSpaceModal());
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
              errors={errors}
            />
          </>
        ) : (
          <ProfileForm
            setProcedure={setProcedure}
            handleSubmit={handleSubmit}
            register={register}
            mode="createSpace"
            errors={errors}
          />
        )}
      </StModalContents>
    </StModalContainer>
  );
}
