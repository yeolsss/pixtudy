import { fieldValues } from "@/components/spaces/constants/constants";
import { useCreateSpace } from "@/hooks/query/useSupabase";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setCreateSpaceInfo } from "@/redux/modules/spaceSlice";
import { Tables } from "@/supabase/types/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import {
  StContentsContainer,
  StFormCTAButton,
  StInputWrapper,
} from "./JoinSpaceForm";
import { CreateSpaceInfo } from "./types/space.types";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function CreateSpaceForm({
  register,
  handleSubmit,
  errors,
}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userProfile = useAppSelector((state) => state.spaceSlice.userProfile);
  const { createSpace, createSuccess, createError } = useCreateSpace(
    (data: Tables<"spaces">) => {
      handleToSpace(data.id);
    }
  );
  const createSpaceInfo = useAppSelector(
    (state) => state.spaceSlice.createSpaceInfo
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
    dispatch(setCreateSpaceInfo({ ...spaceInfo, ...userProfile }));
    console.log("Create space info from selector:", createSpaceInfo);
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
                <label htmlFor="">스페이스 이름</label>
                <StCreateInputWrapper key={fieldValue.name}>
                  <input
                    type={fieldValue.type}
                    placeholder={fieldValue.placeholder}
                    {...register(fieldValue.name, fieldValue.register)}
                  />
                  {errors.spaceName && (
                    <span>{errors.spaceName?.message as string}</span>
                  )}
                </StCreateInputWrapper>
              </div>
            ) : (
              <div key={fieldValue.name}>
                <label htmlFor="">스페이스 설명</label>
                <StCreateInputWrapper key={fieldValue.name}>
                  <textarea
                    key={fieldValue.name}
                    placeholder={fieldValue.placeholder}
                    {...register(fieldValue.name, fieldValue.register)}
                  />
                  {errors.spaceDescription && (
                    <span>{errors.spaceDescription?.message as string}</span>
                  )}
                </StCreateInputWrapper>
              </div>
            )
          )}
        </div>
      </StCreateContentsContainer>
      <div>
        <StFormCTAButton type="submit">스페이스 생성하기</StFormCTAButton>
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

const StCreateInputWrapper = styled(StInputWrapper)`
  height: auto;
`;
