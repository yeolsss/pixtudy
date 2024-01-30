import DefaultSpanText from "@/components/common/text/DefaultSpanText";
import { useGetCategories, useUpdateCategory } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { options } from "../constants/constants";

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
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const categories = useGetCategories(spaceId);
  const [isOpen, setIsOpen] = useState(false);
  const { update, isSuccess, isError } = useUpdateCategory(spaceId);
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
                {options.map((option, idx) => {
                  return (
                    <StColorOption
                      key={idx}
                      $color={option}
                      $isSelected={selectedOption === option}
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                    >
                      <span key={idx} />
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

const StCategoryForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing[12]};
  height: ${(props) => props.theme.unit[20]}px;

  & > input {
    flex-shrink: 1;
    width: 100%;
    height: ${(props) => props.theme.unit[16]}px;
    padding: ${(props) => props.theme.spacing[12]} 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  }
  & > input:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.color.border.focusRing};
  }
`;

const StDropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: ${(props) => props.theme.unit[24]}px;
  left: -${(props) => props.theme.unit[4]}px;
  box-shadow: ${(props) => props.theme.elevation.Light.shadow2};
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

const StDropdownButton = styled.div<{ $isOpen: boolean }>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.unit[16]}px;
  font-size: 0;
  cursor: pointer;
  & > span {
    font-size: 0;
    width: ${(props) => props.theme.unit[14]}px;
    height: ${(props) => props.theme.unit[16]}px;
    background-image: url("/assets/dropdownArrow.svg");
    transform: ${(props) =>
      props.$isOpen ? "rotateX(0deg)" : "rotateX(180deg)"};
  }
`;

const StSelectedColor = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: ${(props) => props.theme.unit[12]}px;
  height: ${(props) => props.theme.unit[12]}px;
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
`;

const StColorOption = styled.div<{ $color: string; $isSelected: boolean }>`
  display: flex;
  padding: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.blue[100]
      : props.theme.color.bg.secondary};
  cursor: pointer;
  flex-direction: column;
  &:hover {
    background-color: ${(props) => props.theme.color.blue[300]};
  }
  & > span {
    width: ${(props) => props.theme.unit[12]}px;
    height: ${(props) => props.theme.unit[12]}px;
    border-radius: ${(props) => props.theme.border.radius.circle};
    font-size: 0;
    background-color: ${(props) => props.$color};
    background-image: ${(props) =>
      props.$isSelected ? `url('/assets/selected.svg')` : "none"};
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center 60%;
  }
  &:first-child {
    padding-top: ${(props) => props.theme.spacing[8]};
    border-top-left-radius: ${(props) => props.theme.border.radius[8]};
    border-top-right-radius: ${(props) => props.theme.border.radius[8]};
  }
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing[8]};
    border-bottom-left-radius: ${(props) => props.theme.border.radius[8]};
    border-bottom-right-radius: ${(props) => props.theme.border.radius[8]};
  }
`;

const StEditSubmitButton = styled.button`
  width: ${(props) => props.theme.unit[96]}px;
  height: ${(props) => props.theme.unit[40]}px;
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  background-color: ${(props) => props.theme.color.bg.interactive.primary};
  color: ${(props) => props.theme.color.base.white};
  border: 0;
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-pressed"]};
  }
`;

const StEditErrorMessage = styled(DefaultSpanText)`
  top: ${(props) => props.theme.unit[24]}px;
  left: ${(props) => props.theme.unit[40]}px;
`;
