import { useCreateSpace, useJoinSpace } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { validateNickname } from "@/utils/spaceFormValidate";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { FORM_SPACE } from "@/components/spaces/constants/constants";
import {
  resetCreateSpaceInfo,
  resetJoinSpaceInfo,
  setUserProfile,
} from "@/redux/modules/spaceSlice";
import { Tables } from "@/supabase/types/supabase";
import AvatarInput from "./AvatarInput";
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
  const { createSpaceInfo, joinSpaceInfo } = useAppSelector(
    (state) => state.spaceSlice
  );
  const { id: userId, display_name } = useAppSelector(
    (state) => state.authSlice.user
  );
  const dispatch = useAppDispatch();
  const { joinSpace, joinSuccess, joinError } = useJoinSpace();
  const { createSpace, createSuccess, createError } = useCreateSpace(
    (data: Tables<"spaces">) => {
      handleToSpace(data.id);
    }
  );
  console.log("createSpaceInfo: ", createSpaceInfo);
  console.log("joinSpaceInfo: ", joinSpaceInfo);

  const router = useRouter();

  useEffect(() => {
    if (joinSuccess) {
      handleToSpace(joinSpaceInfo?.id!);
      dispatch(resetJoinSpaceInfo());
      return;
    }
    if (createSuccess) {
      dispatch(resetCreateSpaceInfo());
      return;
    }
  }, [joinSuccess, createSuccess]);

  const handleToSpace = async (space_id: string) => {
    await router.replace(`/metaverse/${space_id!}`);
  };

  const handleToPrevious = () => {
    setProcedure(FORM_SPACE);
  };

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    const userProfile: UserProfile = {
      avatar: data.avatar,
      display_name: data.nickname,
      owner: userId,
    };
    dispatch(setUserProfile(userProfile));
    setProcedure(FORM_SPACE);
  };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)}>
      <input
        defaultValue={display_name!}
        type="text"
        placeholder="닉네임"
        {...register("nickname", {
          required: "닉네임을 입력해주십시오.",
          validate: validateNickname,
        })}
      />
      {errors.nickname && <span>{errors.nickname.message as string}</span>}
      <AvatarInput register={register} errors={errors} />
      {errors.avatar && <span>errors.avatar.message</span>}
      <button type="submit">확인</button>
      <button type="button" onClick={handleToPrevious}>
        뒤로 가기
      </button>
    </form>
  );
}
