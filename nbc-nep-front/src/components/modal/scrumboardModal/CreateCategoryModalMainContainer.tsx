import ModalHeader from "@/components/common/modal/ModalHeader";
import CreateCategoryForm from "@/components/scrumboard/detail/CreateCategoryForm";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import useModal from "@/hooks/modal/useModal";
import {
  StCreateCategoryModalContainer,
  StCreateCategoryModalContents,
} from "./styles/createCategoryModal.styles";

export default function CreateCategoryModalMainContainer() {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [handleFocus, handleBlur] = useFocusInput();

  return (
    <div onFocus={handleFocus} onBlur={handleBlur}>
      <StCreateCategoryModalContainer>
        <ModalHeader text="카테고리 만들기" handler={handleCloseModal} />
        <StCreateCategoryModalContents>
          <CreateCategoryForm />
        </StCreateCategoryModalContents>
      </StCreateCategoryModalContainer>
    </div>
  );
}
