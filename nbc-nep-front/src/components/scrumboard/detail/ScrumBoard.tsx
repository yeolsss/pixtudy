import { StCTAButton } from "@/components/common/button/button.styles";
import ModalPortal from "@/components/modal/ModalPortal";
import CreateCategoryModal from "@/components/modal/scrumboardModal/CreateCategoryModal";
import CreateBackDrop from "@/components/scrumboard/detail/CreateBackDrop";
import useModal from "@/hooks/modal/useModal";
import { useGetCategories } from "@/hooks/query/useSupabase";
import useCategorySubscribe from "@/hooks/scrumBoard/useCategorySubscribe";
import useScrumBardItemsSubscribe from "@/hooks/scrumBoard/useScrumBardItemsSubscribe";
import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import { Kanban_categories } from "@/supabase/types/supabase.tables.type";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";

export default function ScrumBoard() {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const { openCreateCategoryModal, isCreateCategoryModalOpen } = useModal();
  const { setCategories } = useScrumBoard();
  const categories = useGetCategories(spaceId);
  const { isOpen: isCreateBackDropOpen } = useScrumBoardItemBackDrop();

  useCategorySubscribe(spaceId);
  // items에 대한 구독 커스텀훅
  useScrumBardItemsSubscribe(spaceId, categories as Kanban_categories[]);

  useEffect(() => {
    console.log(categories);
    setCategories(categories!);
  }, [categories]);

  const handleAddCategory = () => {
    openCreateCategoryModal();
  };

  return (
    <StScrumBoardWrapper>
      <StScrumBoardContainer>
        <div>
          {categories?.map((category) => {
            return <ScrumBoardCategory key={category.id} category={category} />;
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
  //-ms-overflow-style: none;
  //scrollbar-width: none;
  margin: 0 auto;
  position: relative;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
  }
  /*&::-webkit-scrollbar {
    display: none;
  }*/
`;

const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]}px;
`;
