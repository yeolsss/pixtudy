import { StFormCTAButton } from "@/components/common/button/button.styles";
import DefaultSpanText from "@/components/common/text/DefaultSpanText";
import { StErrorMessage } from "@/components/spaces/JoinSpaceForm";
import useModal from "@/hooks/modal/useModal";
import { useCreateCategory, useGetCategories } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { options } from "../constants";
import {
  StCategoryColorItem,
  StCategoryItemWrapper,
  StCreateCategoryForm,
} from "../styles/category.styles";

export default function CreateCategoryForm() {
  const { space_id: spaceId } = useParams();
  const categories = useGetCategories(spaceId as string);
  const categoryNames = categories?.map((category) => category.name);
  const { create } = useCreateCategory(spaceId as string);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { closeModal } = useModal();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: "onChange" });

  const validateCategoryName = (name: string) => {
    return categoryNames?.some((category) => category === name)
      ? "이미 존재하는 카테고리입니다."
      : true;
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleCreateCategory = (data: FieldValues) => {
    const newCategory = {
      spaceId: spaceId as string,
      name: data.name,
      color: data.color,
    };
    create(newCategory);
    closeModal();
  };

  return (
    <StCreateCategoryForm onSubmit={handleSubmit(handleCreateCategory)}>
      <div>
        <h3>이름</h3>
        <input
          type="text"
          placeholder="카테고리 이름"
          {...register("name", {
            required: "카테고리 이름을 입력해주세요.",
            validate: validateCategoryName,
          })}
        />
        {errors.name && (
          <StErrorMessage>{errors.name.message as string}</StErrorMessage>
        )}
      </div>
      <div>
        <h3>카테고리 색상</h3>
        <div>
          {options.map((option) => {
            return (
              <StCategoryItemWrapper
                key={option}
                $isSelected={selectedColor === option}
              >
                <StCategoryColorItem
                  key={option}
                  $color={option}
                  $isSelected={selectedColor === option}
                >
                  <label htmlFor={option}>
                    <input
                      type="radio"
                      id={option}
                      value={option}
                      {...register("color", {
                        required: "카테고리 색상을 선택해주세요.",
                        onChange: handleCategorySelect,
                      })}
                    />
                  </label>
                </StCategoryColorItem>
              </StCategoryItemWrapper>
            );
          })}
        </div>
        {errors.color && (
          <DefaultSpanText>{errors.name?.message as string}</DefaultSpanText>
        )}
      </div>
      <StFormCTAButton type="submit" disabled={!isValid}>
        확인
      </StFormCTAButton>
    </StCreateCategoryForm>
  );
}
