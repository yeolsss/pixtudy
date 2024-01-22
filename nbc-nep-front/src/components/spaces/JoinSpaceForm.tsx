//@ts-nocheck
import {
  useGetSpace,
  useGetUserSpaces,
  useJoinSpace,
} from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import {
  resetJoinSpaceInfo,
  setJoinSpaceInfo,
} from "@/redux/modules/spaceSlice";
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
import { StCTAButton } from "../common/button/button.styles";
import SpacePreview from "./SpacePreview";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  reset: UseFormReset<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function InvitationCodeForm({
  setProcedure,
  handleSubmit,
  register,
  reset,
  errors,
}: Props) {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.authSlice.user);
  const userProfile = useAppSelector((state) => state.spaceSlice.userProfile);
  const { joinSpaceInfo } = useAppSelector((state) => state.spaceSlice);
  const { joinSpace, joinError, joinSuccess } = useJoinSpace();
  const userJoinedSpaces = useGetUserSpaces(userId);
  const router = useRouter();
  const getSpace = useGetSpace();

  useEffect(() => {
    if (joinSuccess) {
      handleToSpace(joinSpaceInfo?.id!);
      dispatch(resetJoinSpaceInfo());
      return;
    }
  }, [joinSuccess]);

  const handleToSpace = async (space_id: string) => {
    await router.replace(`/metaverse/${space_id!}`);
  };

  const handleInvitationSubmit: SubmitHandler<FieldValues> = (data) => {
    getSpace(data.invitationCode, {
      onSuccess: (targetSpace) => {
        dispatch(setJoinSpaceInfo(targetSpace));
        reset({ invitationCode: "" });
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
  };

  return (
    <StForm onSubmit={handleSubmit(handleInvitationSubmit)}>
      <StContentsContainer>
        <div>
          <label htmlFor="invitationCode">초대코드</label>
          <StInputWrapper>
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
      <SpacePreview setProcedure={setProcedure} />
      <StFormCTAButton type="button" onClick={handleJoinSpace}>
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

export const StInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[6]};
  gap: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[48]}px;
  input {
    width: 100%;
    flex-shrink: 1;
    border-radius: ${(props) => props.theme.border.radius[8]};
    padding: ${(props) => props.theme.spacing[12]};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
  }
  & > button {
    height: ${(props) => props.theme.unit[48]}px;
    width: ${(props) => props.theme.unit[80]}px;
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

export const StFormCTAButton = styled(StCTAButton)`
  font-size: ${(props) => props.theme.body.md.medium.fontSize};
  font-family: var(--point-font);
  font-weight: ${(props) => props.theme.heading.desktop["4xl"].fontWeight};
  width: 100%;
`;
