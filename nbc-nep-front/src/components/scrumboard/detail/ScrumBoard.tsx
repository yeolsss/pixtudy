import ModalPortal from "@/components/modal/ModalPortal";
import CreateCategoryModal from "@/components/modal/scrumboardModal/CreateCategoryModal";
import CreateBackDrop from "@/components/scrumboard/detail/CreateBackDrop";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import useModal from "@/hooks/modal/useModal";
import { useGetCategories, useGetSpaceQuery } from "@/hooks/query/useSupabase";
import useCategorySubscribe from "@/hooks/scrumBoard/useCategorySubscribe";
import useScrumBardItemsSubscribe from "@/hooks/scrumBoard/useScrumBardItemsSubscribe";
import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, WheelEvent } from "react";
import { KanbanCategories } from "@/types/supabase.tables.types";
import {
  StAddCategoryBtn,
  StScrumBoardContainer,
  StScrumBoardWrapper,
} from "../styles/scrumBoard.styles";
import ScrumBoardCategory from "./ScrumBoardCategory";
import ScrumBoardHeader from "./ScrumBoardHeader";

export default function ScrumBoard() {
  const { space_id: spaceId } = useParams();
  const { openCreateCategoryModal, isCreateCategoryModalOpen } = useModal();
  const { setCategories } = useScrumBoard();
  const categories = useGetCategories(spaceId as string);
  const isCreateBackDropOpen = useScrumBoardItemBackDropStore.use.isOpen();
  const spaceData = useGetSpaceQuery(spaceId as string);

  useCategorySubscribe(spaceId as string);
  // items에 대한 구독 커스텀훅
  useScrumBardItemsSubscribe(
    spaceId as string,
    categories as KanbanCategories[]
  );

  useEffect(() => {
    setCategories(categories!);
  }, [categories]);

  const handleAddCategory = () => {
    openCreateCategoryModal();
  };

  const [handleFocus, handleBlur] = useFocusInput();

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <StScrumBoardWrapper>
      <ScrumBoardHeader title={spaceData ? spaceData.title : ""} />
      <AnimatePresence>
        <StScrumBoardContainer onWheel={handleWheel}>
          <div onFocus={handleFocus} onBlur={handleBlur}>
            {categories?.map((category) => {
              return (
                <ScrumBoardCategory key={category.id} category={category} />
              );
            })}
            <div>
              <StAddCategoryBtn onClick={handleAddCategory}>
                add category
              </StAddCategoryBtn>
            </div>
          </div>
        </StScrumBoardContainer>
        {isCreateCategoryModalOpen && (
          <ModalPortal>
            <CreateCategoryModal />
          </ModalPortal>
        )}
        {isCreateBackDropOpen && <CreateBackDrop />}
      </AnimatePresence>
    </StScrumBoardWrapper>
  );
}
