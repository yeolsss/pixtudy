import { useCallback, useEffect } from "react";
import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";

export default function useDebounceSpaceMemberSearch(timeout: number = 1000) {
  let timerId: NodeJS.Timeout | null = null;
  const filterSpaceMembers =
    useScrumBoardMemberSearchStore.use.filterSpaceMembers();

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      filterSpaceMembers();
      clearTimeout(timerId as NodeJS.Timeout);
    }, timeout);
  }, []);
}
