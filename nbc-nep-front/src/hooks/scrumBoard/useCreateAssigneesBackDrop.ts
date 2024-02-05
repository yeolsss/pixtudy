import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import { useEffect } from "react";
import { SpaceMembers } from "@/types/supabase.tables.types";

interface ReturnType {
  filteredSpaceMembers: SpaceMembers[];
  backDropIsOpen: boolean;
  setBackDropIsOpen: (isOpen: boolean) => void;
  handleBackDropClickItem: (selectAssign: SpaceMembers) => void;
}

export default function useCreateAssigneesBackDrop(): ReturnType {
  const filteredSpaceMembers =
    useScrumBoardMemberSearchStore.use.filteredSpaceMembers();
  const filterSpaceMembers =
    useScrumBoardMemberSearchStore.use.filterSpaceMembers();
  const searchValue = useScrumBoardMemberSearchStore.use.searchValue();
  const backDropIsOpen = useScrumBoardMemberSearchStore.use.backDropIsOpen();
  const setBackDropIsOpen =
    useScrumBoardMemberSearchStore.use.setBackDropIsOpen();
  const setAssignees = useScrumBoardMemberSearchStore.use.setAssignees();
  const changeSearchValue =
    useScrumBoardMemberSearchStore.use.changeSearchValue();

  useEffect(() => {
    if (searchValue !== "") {
      setBackDropIsOpen(true);
    } else {
      setBackDropIsOpen(false);
    }
  }, [searchValue]);
  const handleBackDropClickItem = (selectAssign: SpaceMembers) => {
    setAssignees(selectAssign);
    filterSpaceMembers();
    changeSearchValue("");
  };

  return {
    filteredSpaceMembers,
    backDropIsOpen,
    setBackDropIsOpen,
    handleBackDropClickItem,
  };
}
