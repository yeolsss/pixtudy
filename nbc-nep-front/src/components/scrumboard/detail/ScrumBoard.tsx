import { StCTAButton } from "@/components/common/button/button.styles";
import ModalPortal from "@/components/modal/ModalPortal";
import CreateCategoryModal from "@/components/modal/scrumboardModal/CreateCategoryModal";
import CreateBackDrop from "@/components/scrumboard/detail/CreateBackDrop";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import useModal from "@/hooks/modal/useModal";
import { useGetCategories, useGetSpaceQuery } from "@/hooks/query/useSupabase";
import useCategorySubscribe from "@/hooks/scrumBoard/useCategorySubscribe";
import useScrumBardItemsSubscribe from "@/hooks/scrumBoard/useScrumBardItemsSubscribe";
import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import { Kanban_categories } from "@/types/supabase.tables.types";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { WheelEvent, useEffect } from "react";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";
import ScrumBoardHeader from "./ScrumBoardHeader";

const StScrumBoardWrapper = styled.div`
  position: relative;
`;

const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: auto;
  margin: 0 auto;
  position: relative;
  padding: 0 ${(props) => props.theme.spacing[24]};
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
  }
`;

const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]};
`;
export default function ScrumBoard() {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const { openCreateCategoryModal, isCreateCategoryModalOpen } = useModal();
  const { setCategories } = useScrumBoard();
  const categories = useGetCategories(spaceId);
  const isCreateBackDropOpen = useScrumBoardItemBackDropStore.use.isOpen();
  const spaceData = useGetSpaceQuery(spaceId);

  useCategorySubscribe(spaceId);
  // items에 대한 구독 커스텀훅
  useScrumBardItemsSubscribe(spaceId, categories as Kanban_categories[]);

  useEffect(() => {
    setCategories(categories!);
  }, [categories]);

  const handleAddCategory = () => {
    openCreateCategoryModal();
  };

  const [handleFocus, handleBlur] = useFocusInput();

  // 이거 strict equality 써도 되나?
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY != 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  return (
    <StScrumBoardWrapper>
      <ScrumBoardHeader title={spaceData?.title || "Default title"} />
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

const StScrumBoardWrapper = styled.div`
  position: relative;
`;

const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: auto;
  margin: 0 auto;
  position: relative;
  padding: 0 ${(props) => props.theme.spacing[24]};
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
  }
`;

const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]};
`;
