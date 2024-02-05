import {
  fieldValues,
  SPACE_DESCRIPTION_MAX_LENGTH,
  SPACE_NAME_MAX_LENGTH,
} from "@/components/spaces/constants/constants";
import { useCreateSpace } from "@/hooks/query/useSupabase";
import { Tables } from "@/types/supabase.types";
import useSpaceStore from "@/zustand/spaceStore";
import { useRouter } from "next/router";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { StFormCTAButton } from "../common/button/button.styles";
import DefaultSpanText from "../common/text/DefaultSpanText";
import { StErrorMessage } from "./JoinSpaceForm";
import { StCreateInputWrapper } from "./styles/spaceCommon.styles";
import { CreateSpaceInfo } from "../../types/space.types";
import {
  StCreateContentsContainer,
  StCreateSpaceForm,
} from "./styles/createSpaceFrom.styles";

interface Props {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  isValid: boolean;
}

export default function CreateSpaceForm({
  register,
  handleSubmit,
  errors,
  isValid,
}: Props) {
  const router = useRouter();
  const userProfile = useSpaceStore.use.userProfile();
  const setCreateSpaceInfo = useSpaceStore.use.setCreateSpaceInfo();

  const handleToSpace = async (spaceId: string) => {
    await router.replace(`/metaverse/${spaceId!}`);
  };

  const { createSpace } = useCreateSpace((data: Tables<"spaces">) => {
    handleToSpace(data.id);
  });

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
                <StCreateInputWrapper
                  key={fieldValue.name}
                  $isError={!!errors.spaceName?.message}
                >
                  <label htmlFor={fieldValue.name}>스페이스 이름</label>
                  <input
                    type={fieldValue.type}
                    placeholder={fieldValue.placeholder}
                    maxLength={SPACE_NAME_MAX_LENGTH}
                    {...register(fieldValue.name, fieldValue.register)}
                  />
                  {errors.spaceName && (
                    <StErrorMessage>
                      {errors.spaceName?.message as string}
                    </StErrorMessage>
                  )}
                </StCreateInputWrapper>
              </div>
            ) : (
              <div key={fieldValue.name}>
                <StCreateInputWrapper
                  key={fieldValue.name}
                  $isError={!!errors.spaceDescription?.message}
                >
                  <label htmlFor={fieldValue.name}>
                    스페이스 설명
                    <textarea
                      key={fieldValue.name}
                      id={fieldValue.name}
                      placeholder={fieldValue.placeholder}
                      maxLength={SPACE_DESCRIPTION_MAX_LENGTH}
                      {...register(fieldValue.name, fieldValue.register)}
                    />
                  </label>

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
