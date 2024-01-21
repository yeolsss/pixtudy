//@ts-nocheck
import { testGet } from "@/api/supabase/space";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useInput from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setJoinSpaceInfo } from "@/redux/modules/spaceSlice";
import { useMutation } from "@tanstack/react-query";
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

export default function InvitationCodeForm({
  handleSubmit,
  register,
  reset,
  errors,
}: Props) {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userJoinedSpaces = useGetUserSpaces(userId);
  // console.log(userJoinedSpaces);
  const { mutate } = useMutation({
    mutationFn: (code: string) => testGet(code),
    onSuccess: (res: any) => {
      const { data } = res;
      const targetSpace = data;
      console.log(targetSpace);
      dispatch(
        setJoinSpaceInfo({
          title: targetSpace?.title!,
          description: targetSpace?.description!,
          owner: targetSpace?.owner!,
          user_id: userId,
          space_id: targetSpace?.id!,
        })
      );
    },
    onError: (error: any) => console.error(error),
  });
  const handleInvitationSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      mutate(data.invitationCode);
      reset({ invitationCode: "" });
      // 이 부분 이후로 진행이 안 됌
    } catch (error) {
      console.error(error);
    }
    /* if (!targetSpace) {
      console.log("초대 코드가 올바르지 않습니다.");
      return;
    } */
  };

  const onInvitationCodeChange = (invitationCode: string) => {
    return userJoinedSpaces?.some((space) => space.space_id === invitationCode)
      ? "이미 멤버인 스페이스입니다."
      : true;
  };

  const [value, _, handleChange] = useInput("");

  return (
    <form onSubmit={handleSubmit(handleInvitationSubmit)}>
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
      <button type="submit">입장하기</button>
    </form>
  );
}

const StForm = styled.form``;
