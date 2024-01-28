import NoContents from "@/components/common/NoContents";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants/constants";
import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import styled from "styled-components";
import CategoryHeader from "./CategoryHeader";
import ScrumBoardItem from "./ScrumBoardItem";

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
      <CategoryHeader
        name={name}
        color={color}
        id={id}
        itemCount={items ? items?.length : 0}
      />
      {items?.length ? (
        <StItemsContainer>
          {items?.map((item, index) => {
            return (
              <ScrumBoardItem key={index} item={item} category={category} />
            );
          })}
        </StItemsContainer>
      ) : (
        <NoContents text="스크럼보드에 아이템을 추가해 보세요!" />
      )}
      <button onClick={handleAddItem}>Add Item</button>
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  // 임의로 설정한 너비
  min-width: 384px;
  background-color: ${(props) => props.theme.color.bg.secondary};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

const StItemsContainer = styled.ul`
  display: flex;
  // 임의로 설정한 높이
  height: calc(100vh - 300px);
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  background-color: #f5f5f5;
  border-radius: ${(props) => props.theme.border.radius[8]};
  padding: ${(props) => props.theme.spacing[16]};
  padding-top: 0;
`;
