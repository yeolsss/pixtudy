import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
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

  const openAvatarModal = () => openModal("isAvatarModalOpen");

  const openForgetPasswordModal = () => openModal("isForgetPasswordModalOpen");

  const openConfigModal = () => openModal("isConfigModalOpen");

  return {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isAvatarModalOpen,
    isConfigModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openAvatarModal,
    isForgetPasswordModalOpen,
    closeModal,
    setSpace,
    clearSpace,
    openForgetPasswordModal,
    openConfigModal,
  };
}
