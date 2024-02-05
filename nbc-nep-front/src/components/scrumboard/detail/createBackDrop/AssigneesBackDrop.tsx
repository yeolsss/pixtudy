import useCreateAssigneesBackDrop from "@/hooks/scrumBoard/useCreateAssigneesBackDrop";
import {
  StAssigneesBackDropItem,
  StAssigneesBackDropItemNoSearch,
  StAssigneesBackDropWrapper,
} from "@/components/scrumboard/styles/backdrop.styles";

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
