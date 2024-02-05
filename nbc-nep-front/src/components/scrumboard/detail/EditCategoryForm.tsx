import { useGetCategories, useUpdateCategory } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  StCategoryForm,
  StColorOption,
  StDropdownButton,
  StDropdownWrapper,
  StEditErrorMessage,
  StEditSubmitButton,
  StSelectedColor,
} from "@/components/scrumboard/styles/category.styles";
import { options } from "../constants";

/**
 * TODO:
 * Delete
 */
interface Props {
  name: string;
  color: string;
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function EditCategoryForm({
  name: currentName,
  id: currentId,
  color: currentColor,
  setIsEdit,
}: Props) {
  const { space_id: spaceId } = useParams();
  const categories = useGetCategories(spaceId as string);
  const [isOpen, setIsOpen] = useState(false);
  const { update } = useUpdateCategory(spaceId as string);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const selectedOption = watch<"color">("color", currentColor);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditSubmit = (data: FieldValues) => {
    if (data.name === currentName && data.color === currentColor) {
      setIsEdit(false);
      return;
    }
    const updateData = {
      id: currentId,
      name: data.name,
      color: data.color,
    };
    update(updateData);
    setIsEdit(false);
  };

  const validateCategoryName = (name: string) => {
    if (name === currentName) return true;
    if (categories?.some((category) => category.name === name))
      return "이미 존재하는 카테고리입니다.";
    return true;
  };

  return (
    <StCategoryForm onSubmit={handleSubmit(handleEditSubmit)}>
      <Controller
        control={control}
        name="color"
        defaultValue={currentColor}
        render={({ field: { onChange } }) => (
          <div ref={dropdownRef}>
            <StDropdownButton
              onClick={() => setIsOpen(!isOpen)}
              $isOpen={isOpen}
            >
              <StSelectedColor $color={selectedOption} />
              <span />
            </StDropdownButton>
            {isOpen && (
              <StDropdownWrapper>
                {options.map((option) => {
                  return (
                    <StColorOption
                      key={option}
                      $color={option}
                      $isSelected={selectedOption === option}
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                    >
                      <span key={`${option}span`} />
                    </StColorOption>
                  );
                })}
              </StDropdownWrapper>
            )}
          </div>
        )}
      />
      <input
        type="text"
        defaultValue={currentName}
        {...register("name", {
          required: "카테고리 이름이 필요합니다",
          validate: validateCategoryName,
        })}
      />
      {errors.name && (
        <StEditErrorMessage>{errors.name.message as string}</StEditErrorMessage>
      )}
      <StEditSubmitButton type="submit">저장</StEditSubmitButton>
    </StCategoryForm>
  );
}
