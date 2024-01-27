import { useUpdateCategory } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { options } from "../constants/constants";

interface Props {
  name: string;
  color: string;
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function EditCategoryForm({
  name,
  color,
  id,
  setIsEdit,
}: Props) {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const [isOpen, setIsOpen] = useState(false);
  const { update, isSuccess, isError } = useUpdateCategory(spaceId);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const selectedOption = watch("color", color);

  const handleEditSubmit = (data: FieldValues) => {
    const updateData = {
      id,
      name: data.name,
      color: data.color,
    };
    console.log(updateData);
    update(updateData);
    setIsEdit(false);
  };

  return (
    <StCategoryForm onSubmit={handleSubmit(handleEditSubmit)}>
      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, onBlur } }) => (
          <StDropDown>
            {isOpen &&
              options.map((option, idx) => {
                return (
                  <StColorOption
                    key={idx}
                    $color={option}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  />
                );
              })}
            {!isOpen && (
              <StColorOption
                $color={selectedOption}
                onClick={() => setIsOpen(true)}
              />
            )}
          </StDropDown>
        )}
      />
      <input type="text" defaultValue={name} {...register("name")} />
      <button type="submit" value={"sub"} />
    </StCategoryForm>
  );
}

const StCategoryForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing[8]};
  height: ${(props) => props.theme.unit[24]}px;

  & > input {
    flex-shrink: 1;
    width: 100%;
    height: ${(props) => props.theme.unit[16]}px;
    padding: ${(props) => props.theme.spacing[12]} 0;
    border: none;
    border-radius: ${(props) => props.theme.border.radius[4]};
    margin-left: ${(props) => props.theme.spacing[24]};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
  }
  & > input:focus {
    /* outline: none; */
  }
`;

const StDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: ${(props) => props.theme.unit[4]}px;
  left: 0;
  gap: ${(props) => props.theme.spacing[4]};
`;

export const StColorOption = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => props.$color};
  width: ${(props) => props.theme.unit[16]}px;
  height: ${(props) => props.theme.unit[16]}px;
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
`;
