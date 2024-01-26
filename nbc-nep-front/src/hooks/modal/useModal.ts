import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isCreateCategoryModalOpen,
    openModal,
    closeModal,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  const openCreateCategoryModal = () => openModal("isCreateCategoryModalOpen");

  return {
    isCreateSpaceModalOpen,
    isCreateCategoryModalOpen,
    isJoinSpaceModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openCreateCategoryModal,
    closeModal,
  };
}
