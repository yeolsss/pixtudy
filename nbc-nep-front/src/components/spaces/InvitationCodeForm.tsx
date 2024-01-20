import { getSpace, useGetUserSpaces } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { FORM_CHARACTER } from "@/components/spaces/constants/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setIsValidSpace: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FormState<FieldValues>["errors"];
  setSpaceId: Dispatch<SetStateAction<string>>;
  spaceId: string;
}

export default function InvitationCodeForm({
  setProcedure,
  handleSubmit,
  register,
  reset,
  setIsValidSpace,
  errors,
  setSpaceId,
  spaceId,
}: Props) {
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userJoinedSpaces = useGetUserSpaces(userId);

  const handleInvitationSubmit: SubmitHandler<FieldValues> = async (data) => {
    const isExistsSpace = await getSpace(data.invitationCode);

    if (!isExistsSpace) {
      alert("초대 코드가 올바르지 않습니다.");
      return;
    }
    setSpaceId(data.invitationCode);
    setProcedure(FORM_CHARACTER);
  };

  const onInvitationCodeChange = (invitationCode: string) => {
    return userJoinedSpaces?.some((space) => space.space_id === invitationCode)
      ? "이미 멤버인 스페이스입니다."
      : true;
  };

  return (
    <form onSubmit={handleSubmit(handleInvitationSubmit)}>
      <input
        type="text"
        placeholder="초대 코드"
        {...register("invitationCode", {
          required: "Space에 입장하려면 초대 코드가 필요합니다.",
          validate: onInvitationCodeChange,
        })}
      />
      {errors.invitationCode && (
        <p>{errors.invitationCode.message as string}</p>
      )}
      <button type="submit">확인</button>
    </form>
  );
}
