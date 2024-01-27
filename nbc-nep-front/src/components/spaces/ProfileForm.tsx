import { validateNickname } from "@/utils/spaceValidate";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { FORM_SPACE, SRC_BASE } from "@/components/spaces/constants/constants";
import useAuth from "@/zustand/authStore";
import useSpace from "@/zustand/spaceStore";
import styled from "styled-components";
import {
  StFormCTAButton,
  StToPreviousButton,
} from "../common/button/button.styles";
import AvatarInput, { StAvatar } from "./AvatarInput";
import { StCreateInputWrapper } from "./styles/spaceCommon.styles";
import { Procedure, UserProfile } from "./types/space.types";

interface ProfileFormProps {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  mode: "createSpace" | "joinSpace";
  isValid: boolean;
}

export default function ProfileForm({
  watch,
  setProcedure,
  handleSubmit,
  register,
  errors,
  mode,
  isValid,
}: ProfileFormProps) {
  const { userProfile, setUserProfile } = useSpace();
  const { user } = useAuth();

  const handleToPrevious = () => {
    setProcedure(FORM_SPACE);
  };

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    const newUserProfile: UserProfile = {
      avatar: data.avatar,
      display_name: data.nickname,
      owner: user.id,
    };
    setUserProfile(newUserProfile);
    setProcedure(FORM_SPACE);
  };
  return (
    <StProfileForm onSubmit={handleSubmit(handleProfileSubmit)}>
      <StCurrentProfile>
        <StAvatarWrapper>
          <StAvatar
            style={{ cursor: "auto" }}
            resource={`${SRC_BASE + (watch("avatar") || "NPC1")}.png`}
          />
        </StAvatarWrapper>
        <StCreateInputWrapper $isError={!!errors?.nickname}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            defaultValue={user.display_name!}
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: "닉네임을 입력해주십시오.",
              validate: validateNickname,
            })}
          />
          {errors.nickname && <span>{errors.nickname.message as string}</span>}
        </StCreateInputWrapper>
      </StCurrentProfile>
      <AvatarInput watch={watch} register={register} errors={errors} />
      {errors.avatar && <span>errors.avatar.message</span>}
      <StButtonWrapper>
        <StFormCTAButton type="submit" disabled={!isValid}>
          확인
        </StFormCTAButton>
        <StToPreviousButton type="button" onClick={handleToPrevious}>
          뒤로 가기
        </StToPreviousButton>
      </StButtonWrapper>
    </StProfileForm>
  );
}

export const StProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};
  align-items: stretch;
`;

export const StCurrentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  label {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  }
`;

export const StAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.bg.secondary};
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[16]} ${(props) =>
    props.theme.spacing[64]};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

export const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};
  justify-content: center;
`;
