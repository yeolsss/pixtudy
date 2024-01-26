import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import styled from "styled-components";
import CategoryHeader from "./CategoryHeader";

interface Props {
  category: Kanban_categories;
}

export default function ScrumBoardCategory({ category }: Props) {
  const handleAddItem = () => {};
  const { id, name, color } = category;
  const items = useGetCategoryItems(id);

  console.log(items);
  return (
    <StCategoryWrapper>
      <CategoryHeader name={name} color={color} id={id} />
      <StItemsContainer>
        {items?.map((item) => {
          return <li key={item.id}>{item.title}</li>;
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
