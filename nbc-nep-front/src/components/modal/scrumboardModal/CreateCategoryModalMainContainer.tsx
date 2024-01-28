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
      <StModalContainer>
        <ModalHeader text="카테고리 만들기" handler={handleCloseModal} />
        <StCreateCategoryModalContents>
          <CreateCategoryForm />
        </StCreateCategoryModalContents>
      </StModalContainer>
    </div>
  );
}

const StCreateCategoryModalContents = styled(StModalContents)`
  width: 100%;
`;
