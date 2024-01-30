import ModalHeader from "@/components/common/modal/ModalHeader";
import CreateCategoryForm from "@/components/scrumboard/detail/CreateCategoryForm";
import useModal from "@/hooks/modal/useModal";
import styled from "styled-components";
import {
  StModalContainer,
  StModalContents,
} from "../spaceModals/joinSpaceModal/JoinSpaceModalMainContainer";

export default function CreateCategoryModalMainContainer() {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <div>
      <StCreateCategoryModalContainer>
        <ModalHeader text="카테고리 만들기" handler={handleCloseModal} />
        <StCreateCategoryModalContents>
          <CreateCategoryForm />
        </StCreateCategoryModalContents>
      </StCreateCategoryModalContainer>
    </div>
  );
}

const StCreateCategoryModalContainer = styled(StModalContainer)`
  box-shadow: ${(props) => props.theme.elevation.Light.shadow4};
  border: 1px solid var(--color-neutral-200);
`;
const StCreateCategoryModalContents = styled(StModalContents)`
  width: 100%;
`;
