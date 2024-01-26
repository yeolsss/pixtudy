import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isForgetPasswordModalOpen,
    openModal,
    closeModal,
  } = modalStore();

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  const openForgetPasswordModal = () => openModal("isForgetPasswordModalOpen");
  return {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isForgetPasswordModalOpen,
    openJoinSpaceModal,
    openCreateSpaceModal,
    openForgetPasswordModal,
    closeModal,
  };
}
