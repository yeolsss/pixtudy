import useModalStore from "@/zustand/modalStore";

export default function useModal() {
  const space = useModalStore.use.space();
  const isCreateSpaceModalOpen = useModalStore.use.isCreateSpaceModalOpen();
  const isJoinSpaceModalOpen = useModalStore.use.isJoinSpaceModalOpen();
  const isCreateCategoryModalOpen =
    useModalStore.use.isCreateCategoryModalOpen();
  const isAvatarModalOpen = useModalStore.use.isAvatarModalOpen();
  const isForgetPasswordModalOpen =
    useModalStore.use.isForgetPasswordModalOpen();
  const isConfigModalOpen = useModalStore.use.isConfigModalOpen();
  const openModal = useModalStore.use.openModal();
  const closeModal = useModalStore.use.closeModal();
  const setSpace = useModalStore.use.setSpace();
  const clearSpace = useModalStore.use.clearSpace();

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
