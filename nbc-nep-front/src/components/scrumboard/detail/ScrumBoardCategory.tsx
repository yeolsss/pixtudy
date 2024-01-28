import NoContents from "@/components/common/NoContents";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants/constants";
import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import CategoryHeader from "./CategoryHeader";
import ScrumBoardItem from "./ScrumBoardItem";

interface Props {
  category: Kanban_categories;
}

export default function ScrumBoardCategory({ category }: Props) {
  const { id: categoryId, name, color } = category;
  const { setIsOpen } = useScrumBoardItemBackDrop();
  const handleAddItem = () => {
    setIsOpen(category, null, BACK_DROP_TYPE_CREATE);
  };
  const [{ isDragging, getItem }, drag] = useDrag({
    type: "category",
    item: { order: category.order },
    collect: (monitor) => ({
      getItem: !!monitor.getItem(),
      isDragging: !!monitor.isDragging(),
    }),
  });
  useEffect(() => {
    console.log(getItem);
  }, [isDragging]);

  const items = useGetCategoryItems(categoryId);
  return (
    <StCategoryWrapper ref={drag}>
      <CategoryHeader
        name={name}
        color={color}
        id={categoryId}
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
      {isDragging && <div>dragging</div>}
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  // 임의로 설정한 너비
  min-width: 384px;
  background-color: ${(props) => props.theme.color.bg.secondary};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
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
