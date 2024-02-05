import NoContents from "@/components/common/NoContents";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants";
import { useGetCategoryItems } from "@/hooks/query/useSupabase";
import useDropItem from "@/hooks/scrumBoard/useDropItem";
import { fadeInOut } from "@/styles/animations";
import { KanbanCategories } from "@/types/supabase.tables.types";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import { AnimatePresence, motion } from "framer-motion";
import { WheelEvent } from "react";
import {
  StAddItemBtn,
  StCategoryWrapper,
  StItemsContainer,
} from "@/components/scrumboard/styles/scrumBoardCategory.styles";
import CategoryHeader from "./CategoryHeader";
import ScrumBoardItem from "./ScrumBoardItem";

interface Props {
  category: KanbanCategories;
}

export default function ScrumBoardCategory({ category }: Props) {
  const { id: categoryId, name, color } = category;
  const setIsOpen = useScrumBoardItemBackDropStore.use.setIsOpen();
  const handleAddItem = () => {
    setIsOpen(category, null, BACK_DROP_TYPE_CREATE);
  };
  const { drop, isOver } = useDropItem(category.id);

  const items = useGetCategoryItems(categoryId);

  const handleWheel = (e: WheelEvent<HTMLUListElement>) => {
    const element = e.currentTarget;
    if (element.scrollHeight > element.clientHeight) e.stopPropagation();
  };

  /**
   * TODO: item 배치하는 순서 기준이 뭐지?
   */
  return (
    <StCategoryWrapper {...fadeInOut()} $isOver={isOver}>
      <CategoryHeader
        name={name}
        color={color}
        id={categoryId}
        itemCount={items ? items?.length : 0}
      />
      {items?.length ? (
        <StItemsContainer ref={drop} onWheel={handleWheel}>
          <AnimatePresence>
            {items?.map((item) => {
              return (
                <motion.div key={item.id} {...fadeInOut({ y: 5 })}>
                  <ScrumBoardItem
                    key={`${item.id}scrumboardItem`}
                    item={item}
                    category={category}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
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
