import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isCreateCategoryModalOpen,
    isAvatarModalOpen,
    isForgetPasswordModalOpen,
    isConfirmModalOpen,
    openModal,
    closeModal,
    setSpace,
    clearSpace,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  const openCreateCategoryModal = () => openModal("isCreateCategoryModalOpen");

  const openAvatarModal = () => openModal("isAvatarModalOpen");

  const openForgetPasswordModal = () => openModal("isForgetPasswordModalOpen");

  const openConfirmModal = () => openModal("isConfirmModalOpen");
  return {
    space,
    isCreateSpaceModalOpen,
    isCreateCategoryModalOpen,
    isJoinSpaceModalOpen,
    isAvatarModalOpen,
    isConfirmModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openAvatarModal,
    openConfirmModal,
    isForgetPasswordModalOpen,
    openCreateCategoryModal,
    closeModal,
    setSpace,
    clearSpace,
    openForgetPasswordModal,
  };
}
