import { StCTAButton } from "@/components/common/button/button.styles";
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
    </>
  );
}

const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: scroll;
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0 auto;
  position: relative;
`;

const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]}px;
`;
