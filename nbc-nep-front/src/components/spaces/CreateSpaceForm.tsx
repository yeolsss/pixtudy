import {
  fieldValues,
  SPACE_DESCRIPTION_MAX_LENGTH,
  SPACE_NAME_MAX_LENGTH,
} from "@/components/spaces/constants/constants";
import { useCreateSpace } from "@/hooks/query/useSupabase";
import { Tables } from "@/supabase/types/supabase";
import useSpace from "@/zustand/spaceStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import { StFormCTAButton } from "../common/button/button.styles";
import DefaultSpanText from "../common/text/DefaultSpanText";
import { StContentsContainer } from "./JoinSpaceForm";
import { StCreateInputWrapper } from "./styles/spaceCommon.styles";
import { CreateSpaceInfo } from "./types/space.types";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  getValues: UseFormGetValues<FieldValues>;
  isValid: boolean;
}

export default function CreateSpaceForm({
  register,
  handleSubmit,
  errors,
  getValues,
  isValid,
}: Props) {
  const router = useRouter();
  const { userProfile, setCreateSpaceInfo } = useSpace();
  const { createSpace, createSuccess } = useCreateSpace(
    (data: Tables<"spaces">) => {
      handleToSpace(data.id);
    }
  );

  useEffect(() => {
    if (createSuccess) {
      return;
    }
  }, [createSuccess]);

  const handleToSpace = async (space_id: string) => {
    await router.replace(`/metaverse/${space_id!}`);
  };

  const handleCreateSpaceSubmit: SubmitHandler<FieldValues> = (data) => {
    const spaceInfo: CreateSpaceInfo = {
      title: data.spaceName,
      description: data.spaceDescription,
    };

    setCreateSpaceInfo({ ...spaceInfo, ...userProfile });
    createSpace({
      description: spaceInfo.description,
      owner: userProfile.owner,
      title: spaceInfo.title,
      space_avatar: userProfile.avatar,
      space_display_name: userProfile.display_name,
      user_id: userProfile.owner,
    });
  };

  return (
    <StCreateSpaceForm onSubmit={handleSubmit(handleCreateSpaceSubmit)}>
      <StCreateContentsContainer>
        <div>
          {fieldValues.map((fieldValue) =>
            fieldValue.type === "text" ? (
              <div key={fieldValue.name}>
                <label htmlFor={fieldValue.name}>스페이스 이름</label>
                <StCreateInputWrapper
                  key={fieldValue.name}
                  $isError={!!errors.spaceName?.message}
                >
                  <input
                    type={fieldValue.type}
                    placeholder={fieldValue.placeholder}
                    maxLength={SPACE_NAME_MAX_LENGTH}
                    {...register(fieldValue.name, fieldValue.register)}
                  />
                  {errors.spaceName && (
                    <DefaultSpanText>
                      {errors.spaceName?.message as string}
                    </DefaultSpanText>
                  )}
                </StCreateInputWrapper>
              </div>
            ) : (
              <div key={fieldValue.name}>
                <label htmlFor="">스페이스 설명 </label>
                <StCreateInputWrapper
                  key={fieldValue.name}
                  $isError={!!errors.spaceDescription?.message}
                >
                  <textarea
                    key={fieldValue.name}
                    placeholder={fieldValue.placeholder}
                    maxLength={SPACE_DESCRIPTION_MAX_LENGTH}
                    {...register(fieldValue.name, fieldValue.register)}
                  />
                  {errors.spaceDescription && (
                    <DefaultSpanText>
                      {errors.spaceDescription?.message as string}
                    </DefaultSpanText>
                  )}
                </StCreateInputWrapper>
              </div>
            )
          )}
        </div>
      </StCreateContentsContainer>
      <div>
        <StFormCTAButton type="submit" disabled={!isValid}>
          스페이스 생성하기
        </StFormCTAButton>
      </div>
    </StCreateSpaceForm>
  );
}

const StCreateSpaceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const StCreateContentsContainer = styled(StContentsContainer)`
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[16]};
  }

  & + div {
    width: 100%;
  }
`;
