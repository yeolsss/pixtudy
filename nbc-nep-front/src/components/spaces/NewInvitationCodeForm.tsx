import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import styled from "styled-components";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function NewInvitationCodeForm({
  handleSubmit,
  register,
  reset,
  errors,
}: Props) {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userJoinedSpaces = useGetUserSpaces(userId);
  // console.log(userJoinedSpaces);

  const handleInvitationSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const targetSpace = await getSpace(data.invitationCode);
    // try {
    //   console.log("얘가 실행이 안됨");
    //   const targetSpace = await getSpace(data.invitationCode);
    //   console.log(targetSpace);
    //   // reset({ invitationCode: "" });
    //   // 이 부분 이후로 진행이 안 됌
    //   // dispatch(
    //   //   setJoinSpaceInfo({
    //   //     title: targetSpace?.title!,
    //   //     description: targetSpace?.description!,
    //   //     owner: targetSpace?.owner!,
    //   //     user_id: userId,
    //   //     space_id: targetSpace?.id!,
    //   //   })
    //   // );
    // } catch (error) {
    //   console.error(error);
    // }
    // if (!targetSpace) {
    //   console.log("초대 코드가 올바르지 않습니다.");
    //   return;
    // }
  };

  const onInvitationCodeChange = (invitationCode: string) => {
    return userJoinedSpaces?.some((space) => space.space_id === invitationCode)
      ? "이미 멤버인 스페이스입니다."
      : true;
  };

  return (
    // <form onSubmit={handleSubmit(handleInvitationSubmit)}>
    <form>
      <input
        autoComplete="off"
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
    </form>
  );
}

const StForm = styled.form``;
