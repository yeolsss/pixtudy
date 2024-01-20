import ModalHeader from "@/components/common/modal/ModalHeader";
import CreateSpaceForm from "@/components/spaces/CreateSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure, SpaceInfo } from "@/components/spaces/types/space.types";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { toggleCreateSpaceModal } from "@/redux/modules/modalSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  StModalContainer,
  StModalContents,
} from "../joinSpaceModal/JoinSpaceModalMainContainer";

export default function CreateSpaceModalMainContainer() {
  const { id, display_name } = useAppSelector((state) => state.authSlice.user);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo | {}>({});
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  return (
    <StModalContainer>
      <ModalHeader
        text="스페이스 만들기"
        handler={() => dispatch(toggleCreateSpaceModal())}
      />
      <StModalContents>
        {procedure === FORM_SPACE ? (
          <CreateSpaceForm
            setProcedure={setProcedure}
            setSpaceInfo={setSpaceInfo}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        ) : (
          <ProfileForm
            setProcedure={setProcedure}
            spaceInfo={spaceInfo}
            defaultDisplayName={display_name!}
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
