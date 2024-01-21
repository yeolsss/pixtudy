import { fieldValues } from "@/components/spaces/constants/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setCreateSpaceInfo } from "@/redux/modules/spaceSlice";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import { StContentsContainer, StInputWrapper } from "./JoinSpaceForm";
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
  const userProfile = useAppSelector((state) => state.spaceSlice.userProfile);
  const createSpaceInfo = useAppSelector(
    (state) => state.spaceSlice.createSpaceInfo
  );

  const handleCreateSpaceSubmit: SubmitHandler<FieldValues> = (data) => {
    const spaceInfo: CreateSpaceInfo = {
      title: data.spaceName,
      description: data.spaceDescription,
    };
    dispatch(setCreateSpaceInfo({ ...spaceInfo, ...userProfile }));
  };
  console.log(createSpaceInfo);

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
        <button type="submit">스페이스 생성하기</button>
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
    gap: ${(props) => props.theme.spacing[12]};
  }
`;

const StCreateInputWrapper = styled(StInputWrapper)`
  height: auto;
`;
