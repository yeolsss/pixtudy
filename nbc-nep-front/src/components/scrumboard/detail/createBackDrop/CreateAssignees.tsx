import AssigneesBackDrop from "@/components/scrumboard/detail/createBackDrop/AssigneesBackDrop";
import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import SelectAssigneesList from "@/components/scrumboard/detail/createBackDrop/SelectAssigneesList";
import useDebounceSpaceMemberSearch from "@/hooks/scrumBoard/useDebounceSpaceMemberSearch";
import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import { useRef } from "react";
import {
  StCreateAssigneesInput,
  StCreateAssigneesInputWrapper,
  StCreateAssigneesWrapper,
} from "@/components/scrumboard/styles/assignee.styles";

export default function CreateAssignees() {
  const searchValue = useScrumBoardMemberSearchStore.use.searchValue();
  const changeSearchValue =
    useScrumBoardMemberSearchStore.use.changeSearchValue();
  const setBackDropIsOpen =
    useScrumBoardMemberSearchStore.use.setBackDropIsOpen();
  const assignees = useScrumBoardMemberSearchStore.use.assignees();

  const debounce = useDebounceSpaceMemberSearch(500);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (searchValue.trim().length > 0) setBackDropIsOpen(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      if (!inputRef.current?.contains(document.activeElement)) {
        setBackDropIsOpen(false);
      }
    }, 500);
  };

  return (
    <StCreateAssigneesWrapper>
      <CreateBackDropTitle title="담당자 등록" />
      <StCreateAssigneesInputWrapper>
        <StCreateAssigneesInput
          type="text"
          placeholder="담당자를 검색해보세요."
          value={searchValue}
          onChange={(e) => {
            changeSearchValue(e.target.value);
            debounce();
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <AssigneesBackDrop />
      </StCreateAssigneesInputWrapper>
      {assignees.length > 0 && <SelectAssigneesList tagType="assignees" />}
    </StCreateAssigneesWrapper>
  );
}
