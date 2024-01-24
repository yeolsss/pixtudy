import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    openModal,
    closeModal,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  return {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    closeModal,
  };
}
