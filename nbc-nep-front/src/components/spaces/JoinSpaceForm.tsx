//@ts-nocheck
import useModal from "@/hooks/modal/useModal";
import {
  useGetSpace,
  useGetUserSpaces,
  useJoinSpace,
} from "@/hooks/query/useSupabase";
import useAuth from "@/zustand/authStore";
import useSpace from "@/zustand/spaceStore";
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
import styled from "styled-components";
import { StFormCTAButton } from "../common/button/button.styles";
import SpacePreview from "./SpacePreview";

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
  const { user } = useAuth();
  const userId = user.id;

  const { userProfile, joinSpaceInfo, resetJoinSpaceInfo, setJoinSpaceInfo } =
    useSpace();
  const { joinSpace, joinSuccess } = useJoinSpace();
  const userJoinedSpaces = useGetUserSpaces(userId);
  const { closeModal } = useModal();

  const router = useRouter();
  const getSpace = useGetSpace();

  useEffect(() => {
    if (joinSuccess) {
      handleToSpace(joinSpaceInfo?.id!);
      resetJoinSpaceInfo();
      closeModal();
      return;
    }
  }, [joinSuccess]);

  const handleToSpace = async (space_id: string) => {
    await router.replace(`/metaverse/${space_id!}`);
  };

  const handleInvitationSubmit: SubmitHandler<FieldValues> = (data) => {
    getSpace(data.invitationCode, {
      onSuccess: (targetSpace) => {
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
      space_id: joinSpaceInfo.id,
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

const StForm = styled.form`
  width: 100%;
`;
export const StContentsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[16]};

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    align-self: flex-start;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
  }
`;

export const StInputWrapper = styled.div<{ $isError: string }>`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[6]};
  gap: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[48]};
  input {
    width: 100%;
    flex-shrink: 1;
    border-radius: ${(props) => props.theme.border.radius[8]};
    padding: ${(props) => props.theme.spacing[12]};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    ${(props) =>
      props.$isError && `border-color: ${props.theme.color.danger[500]}`};
    &:focus {
      outline: none;
      border: 1px solid
        ${(props) => props.theme.color.border.interactive.primary};
    }
  }
  & > button {
    height: ${(props) => props.theme.unit[48]};
    width: ${(props) => props.theme.unit[80]};
    padding: 0;
    font-size: ${(props) => props.theme.body.md.regular.fontSize};
  }
`;

const StErrorMessage = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  color: ${(props) => props.theme.color.danger[500]};
`;
