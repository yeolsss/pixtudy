import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isFindPasswordModalOpen,
    openModal,
    closeModal,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  const openFindPasswordModal = () => openModal("isFindPasswordModalOpen");
  return {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isFindPasswordModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openFindPasswordModal,
    closeModal,
  };
}
