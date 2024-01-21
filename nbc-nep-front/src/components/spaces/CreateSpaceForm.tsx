import {
  FORM_CHARACTER,
  fieldValues,
} from "@/components/spaces/constants/constants";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setCreateSpaceInfo } from "@/redux/modules/spaceSlice";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import ProfilePreview from "./ProfilePreview";
import { CreateSpaceInfo, Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function CreateSpaceForm({
  setProcedure,
  register,
  handleSubmit,
  errors,
}: Props) {
  const dispatch = useAppDispatch();

  const handleCreateSpaceSubmit: SubmitHandler<FieldValues> = (data) => {
    const spaceInfo: CreateSpaceInfo = {
      title: data.spaceName,
      description: data.spaceDescription,
    };
    dispatch(setCreateSpaceInfo(spaceInfo));
    setProcedure(FORM_CHARACTER);
  };

  return (
    <StCreateSpaceForm onSubmit={handleSubmit(handleCreateSpaceSubmit)}>
      <ProfilePreview setProcedure={setProcedure} />
      {fieldValues.map((fieldValue) =>
        fieldValue.type === "text" ? (
          <div key={fieldValue.name}>
            <input
              type={fieldValue.type}
              placeholder={fieldValue.placeholder}
              {...register(fieldValue.name, fieldValue.register)}
            />
            {errors.spaceName && (
              <span>{errors.spaceName?.message as string}</span>
            )}
          </div>
        ) : (
          <div key={fieldValue.name}>
            <textarea
              key={fieldValue.name}
              placeholder={fieldValue.placeholder}
              {...register(fieldValue.name, fieldValue.register)}
            />
            {errors.spaceDescription && (
              <span>{errors.spaceDescription?.message as string}</span>
            )}
          </div>
        )
      )}
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
`;
