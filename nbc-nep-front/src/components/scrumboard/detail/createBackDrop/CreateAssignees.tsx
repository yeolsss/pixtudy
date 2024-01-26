import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import styled from "styled-components";

export default function CreateAssignees() {
  return (
    <StCreateAssigneesWrapper>
      <CreateBackDropTitle title={"담당자 등록"} />
      <StCreateAssigneesInput type="text" />
    </StCreateAssigneesWrapper>
  );
}

const StCreateAssigneesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
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
