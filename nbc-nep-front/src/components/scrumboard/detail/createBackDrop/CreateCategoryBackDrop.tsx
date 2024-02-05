import { updateCategoryItem } from "@/api/supabase/scrumBoard";
import { BACK_DROP_TYPE_CREATE } from "@/components/scrumboard/constants";
import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { KanbanCategories } from "@/types/supabase.tables.types";
import {
  StCreateCategoryBackDrop,
  StCreateCategoryBackDropWrapper,
} from "../../styles/backdrop.styles";

interface Props {
  isOpen: boolean;
}
export default function CreateCategoryBackDrop({ isOpen }: Props) {
  const { categories } = useScrumBoard();

  const selectedCategory = useScrumBoardItemBackDropStore.use.category();
  const setCategory = useScrumBoardItemBackDropStore.use.setCategory();
  const setIsOpenCategoryBackDrop =
    useScrumBoardItemBackDropStore.use.setIsOpenCategoryBackDrop();
  const kanbanItem = useScrumBoardItemBackDropStore.use.kanbanItem();
  const backDropType = useScrumBoardItemBackDropStore.use.backDropType();

  const updateCategoryMutate = useMutation({
    mutationFn: updateCategoryItem,
  });

  const handleOnClickSelectCategory = (category: KanbanCategories) => {
    if (backDropType !== BACK_DROP_TYPE_CREATE && kanbanItem) {
      updateCategoryMutate.mutate(
        {
          id: kanbanItem.id!,
          updateCategoryId: category.id,
        },
        {
          onSuccess: async () => {
            toast.success("카테고리가 변경되었습니다.");
          },
        }
      );
    }

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
        return null;
      })}
    </StCreateCategoryBackDropWrapper>
  );
}
