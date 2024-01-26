import { useState } from "react";
import styled from "styled-components";
import EditCategoryForm from "./EditCategoryForm";

interface Props {
  name: string;
  color: string;
  id: string;
}

export default function CategoryHeader({ name, color, id }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <StCategoryHeader>
      {isEdit ? (
        <EditCategoryForm
          name={name}
          color={color}
          id={id}
          setIsEdit={setIsEdit}
        />
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
  height: ${(props) => props.theme.unit[80]}px;
  padding: ${(props) => props.theme.spacing[8]};
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing[8]};
  }

  & > div > h1 {
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
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
  width: ${(props) => props.theme.unit[20]}px;
  height: ${(props) => props.theme.unit[20]}px;
  padding-left: ${(props) => props.theme.spacing[32]};
  border: none;
  font-size: 0;
  &:hover {
    opacity: 1;
    background-color: inherit;
  }
`;
