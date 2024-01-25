import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CategoryForm from "./CategoryForm";

interface Props {
  name: string;
  color: string;
}

export default function CategoryHeader({ name, color }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {} = useForm();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <StCategoryHeader>
      {isEdit ? (
        <CategoryForm name={name} color={color} />
      ) : (
        <>
          <div>
            <StCategoryColor $color={color}>color</StCategoryColor>
            <h1>{name}</h1>
          </div>
          <StModifyCategoryBtn onClick={handleEdit}>
            modify category
          </StModifyCategoryBtn>
        </>
      )}
    </StCategoryHeader>
  );
}

const StCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing[8]};

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[4]};
  }
`;

const StCategoryColor = styled.span<{ $color: string }>`
  display: block;
  width: ${(props) => props.theme.unit[16]}px;
  height: ${(props) => props.theme.unit[16]}px;
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
  background-color: ${(props) => props.$color};
`;

const StModifyCategoryBtn = styled.button`
  display: block;
  opacity: 0;
  background-color: transparent;
  background-image: url("/assets/edit.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${(props) => props.theme.unit[24]}px;
  height: ${(props) => props.theme.unit[24]}px;
  padding: 0;
  border: none;
  font-size: 0;
  &:hover {
    opacity: 1;
    background-color: inherit;
  }
`;
