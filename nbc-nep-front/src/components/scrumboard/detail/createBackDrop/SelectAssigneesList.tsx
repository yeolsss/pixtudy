import { closeIcon } from "@/assets/boards";
import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import Image from "next/image";
import {
  StDeleteButton,
  StSelectAssigneesCard,
  StSelectAssigneesListWrapper,
} from "@/components/scrumboard/styles/assignee.styles";

interface Props {
  tagType: "assignees" | "labels";
}
export default function SelectAssigneesList({ tagType }: Props) {
  const assignees = useScrumBoardMemberSearchStore.use.assignees();
  const deleteAssignees = useScrumBoardMemberSearchStore.use.deleteAssignees();

  const handleDeleteAssignees = (id: string) => {
    deleteAssignees(id);
  };
  return (
    <StSelectAssigneesListWrapper $tagType={tagType === "assignees"}>
      {assignees.map((assignee) => (
        <StSelectAssigneesCard key={assignee.created_at + assignee.id}>
          <span>{assignee.space_display_name}</span>
          {tagType === "assignees" && (
            <StDeleteButton
              onClick={() => handleDeleteAssignees(assignee.user_id!)}
            >
              <Image src={closeIcon} alt="삭제" width={12} height={12} />
            </StDeleteButton>
          )}
        </StSelectAssigneesCard>
      ))}
    </StSelectAssigneesListWrapper>
  );
}
