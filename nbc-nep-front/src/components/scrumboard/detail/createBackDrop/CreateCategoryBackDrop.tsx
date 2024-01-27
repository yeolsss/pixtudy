import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import styled from "styled-components";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";

interface Props {
  isOpen: boolean;
}
export default function CreateCategoryBackDrop({ isOpen }: Props) {
  const { categories } = useScrumBoard();
  const {
    category: selectedCategory,
    setCategory,
    setIsOpenCategoryBackDrop,
  } = useScrumBoardItemBackDrop();

  const handleOnClickSelectCategory = (category: Kanban_categories) => {
    setCategory(category);
    setIsOpenCategoryBackDrop(false);
  };
  return (
    <StCreateCategoryBackDropWrapper $isOpen={isOpen}>
      {categories.map((category) => {
        if (category.id !== selectedCategory.id)
          return (
            <StCreateCategoryBackDrop
              key={category.id}
              onClick={() => handleOnClickSelectCategory(category)}
            >
              {category.name}
            </StCreateCategoryBackDrop>
          );
      })}
    </StCreateCategoryBackDropWrapper>
  );
}

const StCreateCategoryBackDropWrapper = styled.div<{
  $isOpen: boolean;
}>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  left: 0;
  width: 100%;
  flex-direction: column;
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: ${(props) => props.theme.color.bg.primary};
  padding: ${(props) => props.theme.spacing[12]};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  z-index: 100;
`;

const StCreateCategoryBackDrop = styled.div`
  width: 100%;
  height: ${(props) => props.theme.spacing[32]};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing[24]}
    ${(props) => props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  &:hover {
    box-shadow: ${(props) => props.theme.elevation.Light.shadow16};
  }
  > span {
    color: ${(props) => props.theme.color.text.secondary};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.unit[12]}px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 11px */
    letter-spacing: -0.11px;
  }
`;
