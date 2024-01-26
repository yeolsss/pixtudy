import useSpaceMemberSearch from "@/zustand/spaceMemberStore";
import { useEffect } from "react";
import { Space_members } from "@/supabase/types/supabase.tables.type";

interface ReturnType {
  filteredSpaceMembers: Space_members[];
  backDropIsOpen: boolean;
  setBackDropIsOpen: (isOpen: boolean) => void;
  handleBackDropClickItem: (selectAssign: Space_members) => void;
}

export default function useCreateAssigneesBackDrop(): ReturnType {
  const {
    filteredSpaceMembers,
    filterSpaceMembers,
    searchValue,
    backDropIsOpen,
    setBackDropIsOpen,
    setAssignees,
    changeSearchValue,
  } = useSpaceMemberSearch();

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
