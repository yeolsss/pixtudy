import { useJoinSpace } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { TablesInsert } from "@/types/supabase";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import AvatarInput from "./AvatarInput";

interface ProfileFormProps {
  spaceId: string;
  defaultDisplayName: string;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  handleCancelBtnClick: () => void;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function ProfileForm({
  spaceId,
  defaultDisplayName,
  handleCancelBtnClick,
  register,
  errors,
}: ProfileFormProps) {
  const join = useJoinSpace();
  const { id: userId } = useAppSelector((state) => state.authSlice.user);

  const validateNickname = (nickname: string) => {
    const nicknameReg = new RegExp(/^.{2,12}$/);
    return (
      nicknameReg.test(nickname) ||
      "닉네임은 2글자 이상 12글자 이내여야 합니다."
    );
  };

  const handleProfileSubmit: SubmitHandler<FieldValues> = (data) => {
    const userProfile: TablesInsert<"space_members"> = {
      space_id: spaceId,
      space_avatar: data.avatar,
      space_display_name: data.nickname,
      user_id: userId,
    };

    //
    join(userProfile);
    // console.log(data.avatar);
  };
  return (
    <form onSubmit={handleProfileSubmit}>
      <input
        defaultValue={defaultDisplayName}
        type="text"
        placeholder="닉네임"
        {...register("nickname", {
          required: "닉네임을 입력해주십시오.",
          validate: validateNickname,
        })}
      />
      {errors.nickname && <span>{errors.nickname.message as string}</span>}
      <AvatarInput register={register} />
      {errors.avatar && <span>errors.avatar.message</span>}
      <button type="submit">확인</button>
      <button onClick={handleCancelBtnClick}>취소</button>
    </form>
  );
}
