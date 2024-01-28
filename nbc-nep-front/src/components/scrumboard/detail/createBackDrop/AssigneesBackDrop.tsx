import useCreateAssigneesBackDrop from "@/hooks/scrumBoard/useCreateAssigneesBackDrop";
import styled from "styled-components";

export default function AssigneesBackDrop() {
  const { filteredSpaceMembers, backDropIsOpen, handleBackDropClickItem } =
    useCreateAssigneesBackDrop();

  return (
    <StAssigneesBackDropWrapper $isOpen={backDropIsOpen}>
      {filteredSpaceMembers.length > 0 ? (
        filteredSpaceMembers.map((filteredSpaceMember) => (
          <StAssigneesBackDropItem
            key={filteredSpaceMember.id}
            onClick={() => handleBackDropClickItem(filteredSpaceMember)}
          >
            <span>
              {filteredSpaceMember.space_display_name} (
              {filteredSpaceMember.users?.email})
            </span>
          </StAssigneesBackDropItem>
        ))
      ) : (
        <StAssigneesBackDropItemNoSearch>
          <span>검색 결과가 없습니다.</span>
        </StAssigneesBackDropItemNoSearch>
      )}
    </StAssigneesBackDropWrapper>
  );
}

const StAssigneesBackDropWrapper = styled.ul<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  width: 100%;
  padding: ${(props) => props.theme.spacing[12]};
  background-color: ${(props) => props.theme.color.bg.primary};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  border-radius: ${(props) => props.theme.border.radius[8]};
`;
export const StAssigneesBackDropItemNoSearch = styled.li`
  width: 100%;
  height: ${(props) => props.theme.spacing[32]};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  > span {
    color: ${(props) => props.theme.color.text.secondary};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.unit[12]}px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 11px */
    letter-spacing: -0.11px;
  }
`;
export const StAssigneesBackDropItem = styled(StAssigneesBackDropItemNoSearch)`
  cursor: pointer;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[24]} ${(props) =>
    props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  &:hover {
    box-shadow: ${(props) => props.theme.elevation.Light.shadow16};
  }
`;
