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
import useAuthStore from "@/zustand/authStore";
import useSpaceStore from "@/zustand/spaceStore";
import { Procedure, UserProfile } from "../../types/space.types";
import {
  StFormCTAButton,
  StToPreviousButton,
} from "../common/button/button.styles";
import AvatarInput from "./AvatarInput";
import {
  StAvatar,
  StAvatarWrapper,
  StButtonWrapper,
  StCurrentProfile,
  StProfileForm,
} from "./styles/profileForm.styles";
import { StCreateInputWrapper } from "./styles/spaceCommon.styles";

interface ProfileFormProps {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  isValid: boolean;
}

export default function ProfileForm({
  watch,
  setProcedure,
  handleSubmit,
  register,
  errors,
  isValid,
}: ProfileFormProps) {
  const setUserProfile = useSpaceStore.use.setUserProfile();
  const user = useAuthStore.use.user();
  console.log(user.displayName);

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

  const nicknameRegister = register("nickname", {
    required: "닉네임을 입력해주십시오.",
    validate: validateNickname,
  });

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
          <label htmlFor="nickname">
            닉네임
            <input
              id="nickname"
              defaultValue="user.display_name!"
              type="text"
              name={nicknameRegister.name}
              onBlur={nicknameRegister.onBlur}
              onChange={nicknameRegister.onChange}
              ref={nicknameRegister.ref}
            />
          </label>
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
