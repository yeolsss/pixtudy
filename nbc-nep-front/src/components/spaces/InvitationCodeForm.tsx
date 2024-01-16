import { useGetSpace, useGetUserSpaces } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setIsValidSpace: React.Dispatch<React.SetStateAction<boolean>>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  handleCancelBtnClick: () => void;
  setSpaceId: Dispatch<SetStateAction<string>>;
  spaceId: string;
}

export default function InvitationCodeForm({
  handleSubmit,
  register,
  reset,
  setIsValidSpace,
  error,
  handleCancelBtnClick,
  setSpaceId,
  spaceId,
}: Props) {
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userJoinedSpaces = useGetUserSpaces(userId);
  const { data: spaceData, isError, isLoading } = useGetSpace(spaceId);

  // useEffect(()=>{
  //   if(spaceData) {

  //   }
  // },[spaceData, spaceId])

  const handleInvitationSubmit: SubmitHandler<FieldValues> = (data) => {
    setSpaceId((prev) => data.invitationCode);
    if (spaceData) {
      // 초대코드 유효하지 않다? async 함수로 빼야하나?
      // 첫번째 submit 씹힘
      if (spaceData) {
        console.log(spaceData);
        setIsValidSpace(true);
      } else {
        // alert("초대코드가 유효하지 않습니다.");
      }
    }
  };

  const onInvitationCodeChange = (invitationCode: string) => {
    return userJoinedSpaces?.some((space) => space.space_id === invitationCode)
      ? "이미 멤버인 스페이스입니다."
      : true;
  };

  return isLoading ? (
    <p>isLoading</p>
  ) : (
    <form onSubmit={handleSubmit(handleInvitationSubmit)}>
      <input
        type="text"
        placeholder="초대 코드"
        {...register("invitationCode", {
          required: "Space에 입장하려면 초대 코드가 필요합니다.",
          validate: onInvitationCodeChange,
        })}
      />
      {/* {error && <p>{error?.message as string}</p>} */}
      <button type="submit">확인</button>
      <button onClick={handleCancelBtnClick}>취소</button>
    </form>
  );
}
