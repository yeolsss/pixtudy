import ModalPortal from "@/components/modal/ModalPortal";
import CreateCategoryModal from "@/components/modal/scrumboardModal/CreateCategoryModal";
import useModal from "@/hooks/modal/useModal";
import { useGetCategories } from "@/hooks/query/useSupabase";
import useScrumboard from "@/hooks/scrumboard/useScrumboard";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";

export default function ScrumBoard() {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const { openCreateCategoryModal, isCreateCategoryModalOpen } = useModal();
  const { setCategories } = useScrumboard();
  const categories = useGetCategories(spaceId);
  setCategories(categories!);
  console.log(categories);

  const handleAddCategory = () => {
    openCreateCategoryModal();
  };

  return (
    <>
      <StScrumBoardContainer>
        {categories?.map((category) => {
          return <ScrumBoardCategory key={category.id} category={category} />;
        })}
        <StAddCategoryBtn onClick={handleAddCategory}>
          add category
        </StAddCategoryBtn>
      </StScrumBoardContainer>
      {isCreateCategoryModalOpen && (
        <ModalPortal>
          <CreateCategoryModal />
        </ModalPortal>
      )}
    </>
  );
}

const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[12]};
`;

const StAddCategoryBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
