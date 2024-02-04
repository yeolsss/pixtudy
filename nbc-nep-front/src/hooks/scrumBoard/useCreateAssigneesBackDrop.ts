import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import { useEffect } from "react";
import { Space_members } from "@/supabase/types/supabase.tables.type";

interface ReturnType {
  filteredSpaceMembers: Space_members[];
  backDropIsOpen: boolean;
  setBackDropIsOpen: (isOpen: boolean) => void;
  handleBackDropClickItem: (selectAssign: Space_members) => void;
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
  const handleBackDropClickItem = (selectAssign: Space_members) => {
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
