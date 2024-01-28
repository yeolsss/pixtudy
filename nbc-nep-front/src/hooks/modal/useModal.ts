import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isCreateCategoryModalOpen,
    isAvatarModalOpen,
    isForgetPasswordModalOpen,
    isConfigModalOpen,
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

  const openConfigModal = () => openModal("isConfigModalOpen");

  return {
    space,
    isCreateSpaceModalOpen,
    isCreateCategoryModalOpen,
    isJoinSpaceModalOpen,
    isAvatarModalOpen,
    isConfigModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openAvatarModal,
    isForgetPasswordModalOpen,
    openCreateCategoryModal,
    closeModal,
    setSpace,
    clearSpace,
    openForgetPasswordModal,
    openConfigModal,
  };
}
