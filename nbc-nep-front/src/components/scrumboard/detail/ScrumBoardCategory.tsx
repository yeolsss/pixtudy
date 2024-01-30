import NoContents from "@/components/common/NoContents";
import { StCTAButton } from "@/components/common/button/button.styles";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants/constants";
import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import useDropItem from "@/hooks/scrumBoard/useDropItem";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
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
  const { drop, canDrop, isOver, didDrop, dropResult } = useDropItem(
    category.id
  );

  const items = useGetCategoryItems(categoryId);

  /**
   * TODO: item 배치하는 순서 기준이 뭐지?
   */
  return (
    <StCategoryWrapper $isOver={isOver}>
      <CategoryHeader
        name={name}
        color={color}
        id={categoryId}
        itemCount={items ? items?.length : 0}
      />
      {items?.length ? (
        <StItemsContainer ref={drop}>
          {items?.map((item, index) => {
            return (
              <ScrumBoardItem key={index} item={item} category={category} />
            );
          })}
        </StItemsContainer>
      ) : (
        <div ref={drop}>
          <NoContents text="스크럼보드에 아이템을 추가해 보세요!" />
        </div>
      )}
      <StAddItemBtn onClick={handleAddItem}>
        <span />
        Add Item
      </StAddItemBtn>
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div<{ $isOver: boolean }>`
  // 임의로 설정한 너비
  min-width: 384px;
  box-sizing: content-box;
  background-color: ${(props) => props.theme.color.bg.secondary};
  padding: ${(props) => props.theme.spacing[16]};
  padding-top: 0;
  ${(props) =>
    props.$isOver
      ? `border: 2px solid ${props.theme.color.border.interactive.primary}`
      : `border : 2px solid ${props.theme.color.border.secondary}`};
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
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StAddItemBtn = styled(StCTAButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[12]};
  gap: ${(props) => props.theme.spacing[8]};
  font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  & > span {
    display: block;
    width: ${(props) => props.theme.unit[14]};
    height: ${(props) => props.theme.unit[14]};
    margin-top: -${(props) => props.theme.unit[4]};
    background: url("/assets/additem.svg") no-repeat center center;
    background-size: contain;
  }
`;
