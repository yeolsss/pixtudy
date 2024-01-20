import { getSpace, useGetUserSpaces } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";

interface Props {
  setSpaceId: Dispatch<SetStateAction<string>>;
  setOwnerId: Dispatch<SetStateAction<string>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function InvitationCodeForm({
  setSpaceId,
  setOwnerId,
  handleSubmit,
  register,
  errors,
}: Props) {
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userJoinedSpaces = useGetUserSpaces(userId);

  const handleInvitationSubmit: SubmitHandler<FieldValues> = async (data) => {
    const targetSpace = await getSpace(data.invitationCode);
    if (!targetSpace) {
      alert("초대 코드가 올바르지 않습니다.");
      return;
    }
    setSpaceId(data.invitationCode);
    setOwnerId(targetSpace.owner);
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

const StForm = styled.form``;
