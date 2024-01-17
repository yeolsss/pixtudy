import { useCreateSpace } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { TablesInsert } from "@/types/supabase";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

/**
 * TODO:
 * 스페이스 생성할 때 ProfileFrom 컴포넌트도 가져와야 한다.
 * owner의 새 스페이스에서의 닉네임과 아바타를 설정할 수 있어야 하니까...
 * user flow :
 * 1. 스페이스 생성하기 버튼을 누른다.
 * 2. 스페이스 이름과 설명을 입력한다.
 * 3. 닉네임 과 아바타를 설정한다.
 * 3-1. 아바타를 설정하지 않으면 이전에 사용했던 아바타를 보여준다.
 */
export default function CreateSpaceForm() {
  const { id: userId, display_name } = useAppSelector(
    (state) => state.authSlice.user
  );
  const { createSpace, isError, isSuccess } = useCreateSpace();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const handleCreateSpaceSubmit: SubmitHandler<FieldValues> = (data) => {
    const spaceInfo: TablesInsert<"spaces"> & { display_name: string } = {
      owner: userId,
      title: data.spaceName,
      description: data.spaceDescription,
      display_name: display_name!,
    };
    createSpace(spaceInfo);
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
          <input
            key={fieldValue.name}
            type={fieldValue.type}
            placeholder={fieldValue.placeholder}
            {...fieldValue.register}
          />
        ) : (
          <textarea
            key={fieldValue.name}
            placeholder={fieldValue.placeholder}
            {...fieldValue.register}
          />
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
