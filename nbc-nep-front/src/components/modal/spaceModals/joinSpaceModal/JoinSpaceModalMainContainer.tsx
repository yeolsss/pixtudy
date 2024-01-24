import ModalHeader from "@/components/common/modal/ModalHeader";
import InvitationCodeForm from "@/components/spaces/JoinSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import ProfilePreview from "@/components/spaces/ProfilePreview";
import { FORM_SPACE } from "@/components/spaces/constants/constants";
import { Procedure } from "@/components/spaces/types/space.types";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { toggleJoinSpaceModal } from "@/redux/modules/modalSlice";
import useSpace from "@/zustand/spaceStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function JoinSpaceModalMainContainer() {
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);
  const dispatch = useAppDispatch();
  const { resetJoinSpaceInfo } = useSpace();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const handleCloseModal = () => {
    dispatch(toggleJoinSpaceModal());
    resetJoinSpaceInfo();
  };

  return (
    <StModalContainer>
      <ModalHeader text={"스페이스 입장하기"} handler={handleCloseModal} />
      <StModalJoinSpaceContents>
        {procedure === FORM_SPACE ? (
          <div>
            <ProfilePreview setProcedure={setProcedure} />
            <InvitationCodeForm
              handleSubmit={handleSubmit}
              register={register}
              reset={reset}
              errors={errors}
            />
          </div>
        ) : (
          <ProfileForm
            setProcedure={setProcedure}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            mode="joinSpace"
          />
        )}
      </StModalJoinSpaceContents>
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
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  width: ${(props) => props.theme.unit[460]}px;
  padding: ${(props) => props.theme.spacing[32]};
  /* justify-content: center; */
  padding-top: 0;
  height: 100%;
`;

const StModalJoinSpaceContents = styled(StModalContents)`
  padding: 0;
  & > div {
    width: 100%;
    padding: ${(props) => props.theme.spacing[32]};
  }
`;
