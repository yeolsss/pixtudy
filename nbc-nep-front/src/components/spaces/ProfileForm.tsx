import { useJoinSpace } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { validateNickname } from "@/utils/spaceFormValidate";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { FORM_SPACE, srcBase } from "@/components/spaces/constants/constants";
import { setUserProfile } from "@/redux/modules/spaceSlice";
import styled from "styled-components";
import AvatarInput, { StAvatar } from "./AvatarInput";
import { Procedure, UserProfile } from "./types/space.types";

interface ProfileFormProps {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  mode: "createSpace" | "joinSpace";
}

export default function ProfileForm({
  setProcedure,
  handleSubmit,
  register,
  errors,
  mode,
}: ProfileFormProps) {
  const { createSpaceInfo, joinSpaceInfo, userProfile } = useAppSelector(
    (state) => state.spaceSlice
  );
  const user = useAppSelector((state) => state.authSlice.user);
  const dispatch = useAppDispatch();
  const { joinSpace, joinSuccess, joinError } = useJoinSpace();

  const router = useRouter();

  const handleToPrevious = () => {
    setProcedure(FORM_SPACE);
  };

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    const userProfile: UserProfile = {
      avatar: data.avatar,
      display_name: data.nickname,
      owner: user.id,
    };
    dispatch(setUserProfile(userProfile));
    setProcedure(FORM_SPACE);
  };

  return (
    <StProfileForm onSubmit={handleSubmit(handleProfileSubmit)}>
      <StCurrentProfile>
        <StAvatarWrapper>
          <StAvatar resource={`${srcBase + userProfile.avatar}.png`} />
        </StAvatarWrapper>
        <StInputWrapper>
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
        </StInputWrapper>
        {errors.nickname && <span>{errors.nickname.message as string}</span>}
      </StCurrentProfile>
      <AvatarInput register={register} errors={errors} />
      {errors.avatar && <span>errors.avatar.message</span>}
      <button type="submit">확인</button>
      <button type="button" onClick={handleToPrevious}>
        뒤로 가기
      </button>
    </StProfileForm>
  );
}

const StProfileForm = styled.form``;

const StCurrentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  label {
    font-family: var(--sub-font);
  }
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[24]} ${(props) =>
    props.theme.spacing[0]};
`;

const StAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.bg.secondary};
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[16]} ${(props) =>
    props.theme.spacing[64]};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

const StInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
