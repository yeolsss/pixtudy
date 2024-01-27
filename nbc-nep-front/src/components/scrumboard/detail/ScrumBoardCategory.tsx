import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import styled from "styled-components";
import CategoryHeader from "./CategoryHeader";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import ScrumBoardItem from "@/components/scrumboard/detail/ScrumBoardItem";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants/constants";

interface Props {
  category: Kanban_categories;
}

export default function ScrumBoardCategory({ category }: Props) {
  const { id, name, color } = category;
  const { setIsOpen } = useScrumBoardItemBackDrop();
  const handleAddItem = () => {
    setIsOpen(category, null, BACK_DROP_TYPE_CREATE);
  };
  const items = useGetCategoryItems(id);
  return (
    <StCategoryWrapper>
      <CategoryHeader name={name} color={color} id={id} />
      <StItemsContainer>
        {items?.map((item) => {
          return (
            <ScrumBoardItem key={item.id} category={category} item={item} />
          );
        })}
      </StItemsContainer>
      <button onClick={handleAddItem}>Add Item</button>
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  // 임의로 설정한 너비
  min-width: 320px;
`;

const StItemsContainer = styled.ul`
  display: flex;
  // 임의로 설정한 높이
  height: calc(100vh - 300px);
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  background-color: #f5f5f5;
  border-radius: ${(props) => props.theme.border.radius[8]};
  padding: 10px;
`;
