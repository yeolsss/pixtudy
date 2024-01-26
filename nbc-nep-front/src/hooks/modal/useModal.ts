import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isAvatarModalOpen,
    openModal,
    closeModal,
    setSpace,
    clearSpace,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  const openAvatarModal = () => openModal("isAvatarModalOpen");

  return {
    space,
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isAvatarModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openAvatarModal,
    closeModal,
    setSpace,
    clearSpace,
  };
}
