import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import styled from "styled-components";
import useScrumBoardMemberSearch from "@/zustand/scrumBoardMemberStore";
import AssigneesBackDrop from "@/components/scrumboard/detail/createBackDrop/AssigneesBackDrop";
import useDebounceSpaceMemberSearch from "@/hooks/scrumBoard/useDebounceSpaceMemberSearch";
import { useRef } from "react";
import SelectAssigneesList from "@/components/scrumboard/detail/createBackDrop/SelectAssigneesList";

export default function CreateAssignees() {
  const { searchValue, changeSearchValue, setBackDropIsOpen, assignees } =
    useScrumBoardMemberSearch();
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
      <CreateBackDropTitle title={"담당자 등록"} />
      <StCreateAssigneesInputWrapper>
        <StCreateAssigneesInput
          type="text"
          placeholder={"담당자를 검색해보세요."}
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
      {assignees.length > 0 && <SelectAssigneesList />}
    </StCreateAssigneesWrapper>
  );
}

const StCreateAssigneesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
`;

const StCreateAssigneesInputWrapper = styled.div`
  position: relative;
`;
const StCreateAssigneesInput = styled.input`
  outline: none;
  width: 100%;
  font-family: var(--main-font);
  font-size: ${(props) => props.theme.unit[14]}px;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  background: ${(props) => props.theme.color.text.interactive.inverse};
  color: ${(props) => props.theme.color.text.tertiary};
  overflow: hidden;

  line-height: 150%;
  letter-spacing: -0.14px;
  &:focus {
    border-color: ${(props) => props.theme.color.border.focusRing};
  }
`;
