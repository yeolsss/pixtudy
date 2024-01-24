import modalStore from "@/zustand/modalStore";

export default function useModal() {
  const {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    openModal,
    closeModal,
  } = modalStore();

  const openLoginModal = () => openModal("isLoginModalOpen");

  const openSignUpModal = () => openModal("isSignUpModalOpen");

  const openJoinSpaceModal = () => openModal("isJoinSpaceModalOpen");

  const openCreateSpaceModal = () => openModal("isCreateSpaceModalOpen");

  return {
    isCreateSpaceModalOpen,
    isJoinSpaceModalOpen,
    isSignUpModalOpen,
    isLoginModalOpen,
    openLoginModal,
    openSignUpModal,
    openJoinSpaceModal,
    openCreateSpaceModal,
    closeModal,
  };
}
