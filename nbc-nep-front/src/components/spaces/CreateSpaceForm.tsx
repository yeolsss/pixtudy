import { FORM_CHARACTER } from "@/components/spaces/constants/constants";
import { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import { Procedure, SpaceInfo } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  setSpaceInfo: Dispatch<SetStateAction<SpaceInfo>>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

export default function CreateSpaceForm({
  setProcedure,
  setSpaceInfo,
  register,
  handleSubmit,
  errors,
}: Props) {
  const handleCreateSpaceSubmit: SubmitHandler<FieldValues> = (data) => {
    const spaceInfo: SpaceInfo = {
      title: data.spaceName,
      description: data.spaceDescription,
    };
    setSpaceInfo(() => ({ ...spaceInfo }));
    setProcedure(FORM_CHARACTER);
  };

  const fieldValues = [
    {
      name: "spaceName",
      type: "text",
      placeholder: "스페이스의 이름을 입력해주세요.",
      register: register("spaceName", {
        required: "스페이스를 생성하려면 이름이 필요합니다.",
        minLength: {
          value: 2,
          message: "스페이스의 이름은 2글자 이상이어야 합니다.",
        },
        maxLength: {
          value: 12,
          message: "스페이스의 이름은 12글자 이내여야 합니다.",
        },
      }),
    },
    {
      name: "spaceDescription",
      type: "textarea",
      placeholder: "스페이스를 설명해주세요.",
      register: register("spaceDescription", {
        required: "스페이스를 생성하려면 설명이 필요합니다.",
        maxLength: {
          value: 100,
          message: "스페이스의 설명은 12글자 이내여야 합니다.",
        },
      }),
    },
  ];

  return (
    <StCreateSpaceForm onSubmit={handleSubmit(handleCreateSpaceSubmit)}>
      {fieldValues.map((fieldValue) =>
        fieldValue.type === "text" ? (
          <div key={fieldValue.name}>
            <input
              type={fieldValue.type}
              placeholder={fieldValue.placeholder}
              {...fieldValue.register}
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
              {...fieldValue.register}
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
