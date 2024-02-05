import useModal from "@/hooks/modal/useModal";
import {
  useGetSpace,
  useGetUserSpaces,
  useJoinSpace,
} from "@/hooks/query/useSupabase";
import useAuthStore from "@/zustand/authStore";
import useSpaceStore from "@/zustand/spaceStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { StFormCTAButton } from "../common/button/button.styles";
import SpacePreview from "./SpacePreview";
import {
  StContentsContainer,
  StErrorMessage,
  StForm,
  StInputWrapper,
} from "./styles/joinSpaceForm.styles";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  isValid: boolean;
  errors: FormState<FieldValues>["errors"];
}

export default function InvitationCodeForm({
  handleSubmit,
  register,
  reset,
  isValid,
  errors,
}: Props) {
  const user = useAuthStore.use.user();
  const userId = user.id;

  const userProfile = useSpaceStore.use.userProfile();
  const joinSpaceInfo = useSpaceStore.use.joinSpaceInfo();
  const resetJoinSpaceInfo = useSpaceStore.use.resetJoinSpaceInfo();
  const setJoinSpaceInfo = useSpaceStore.use.setJoinSpaceInfo();

  const { joinSpace, joinSuccess } = useJoinSpace();
  const userJoinedSpaces = useGetUserSpaces(userId);
  const { closeModal } = useModal();

  const router = useRouter();
  const getSpace = useGetSpace();

  const handleToSpace = async (spaceId: string) => {
    await router.replace(`/metaverse/${spaceId!}`);
  };

  useEffect(() => {
    if (joinSuccess && joinSpaceInfo?.id) {
      handleToSpace(joinSpaceInfo.id);
      resetJoinSpaceInfo();
      closeModal();
    }
  }, [joinSuccess]);

  const handleInvitationSubmit: SubmitHandler<FieldValues> = (data) => {
    getSpace(data.invitationCode, {
      onSuccess: (targetSpace) => {
        console.log(targetSpace);
        setJoinSpaceInfo(targetSpace);
      },
      onError: (error) => {
        // 에러 핸들링
        alert("초대 코드가 올바르지 않습니다.");
        console.error(error);
      },
    });
  };

  const onInvitationCodeChange = (invitationCode: string) => {
    return userJoinedSpaces?.some((space) => space.space_id === invitationCode)
      ? "이미 멤버인 스페이스입니다."
      : true;
  };

  const handleJoinSpace = () => {
    joinSpace({
      space_id: joinSpaceInfo.id!,
      space_avatar: userProfile.avatar,
      space_display_name: userProfile.display_name,
      user_id: userProfile.owner,
    });
    reset({ invitationCode: "" });
  };

  return (
    <StForm onSubmit={handleSubmit(handleInvitationSubmit)}>
      <StContentsContainer>
        <div>
          <label htmlFor="invitationCode">초대코드</label>
          <StInputWrapper $isError={!!errors.invitationCode?.message}>
            <input
              id="invitationCode"
              autoComplete="off"
              type="text"
              placeholder="초대 코드를 입력해주세요"
              {...register("invitationCode", {
                required: "Space에 입장하려면 초대 코드가 필요합니다.",
                validate: onInvitationCodeChange,
              })}
            />
            <button type="submit">확인</button>
          </StInputWrapper>
        </div>
        {errors.invitationCode && (
          <StErrorMessage>
            {errors.invitationCode.message as string}
          </StErrorMessage>
        )}
      </StContentsContainer>
      <SpacePreview />
      <StFormCTAButton
        type="button"
        onClick={handleJoinSpace}
        disabled={!isValid}
      >
        입장하기
      </StFormCTAButton>
    </StForm>
  );
}
