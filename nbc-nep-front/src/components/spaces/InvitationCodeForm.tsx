import { useGetSpace, useGetUserSpaces } from "@/hooks/query/useSupabase";
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
import { Procedure } from "../modal/spaceModals/createSpaceModal/CreateSpaceModalMainContainer";

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
  const { validateSpace, isError } = useGetSpace();

  const handleInvitationSubmit: SubmitHandler<FieldValues> = (data) => {
    validateSpace(data.invitationCode);
    if (isError) {
      alert("초대코드가 유효하지 않습니다.");
    } else {
      setSpaceId(data.invitationCode);
      setProcedure("2");
    }
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
