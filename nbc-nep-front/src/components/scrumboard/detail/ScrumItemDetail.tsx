import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import CreateDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader";
import SelectAssigneesList from "@/components/scrumboard/detail/createBackDrop/SelectAssigneesList";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import {
  StCreateDisplayName,
  StDescription,
  StScrumItemDetailWrapper,
} from "@/components/scrumboard/styles/scrumItemDetail.styles";

export default function ScrumItemDetail() {
  const kanbanItem = useScrumBoardItemBackDropStore.use.kanbanItem();

  return (
    <StScrumItemDetailWrapper>
      <StCreateDisplayName>
        <CreateBackDropTitle title="작성자" />
        <span>{kanbanItem?.item_creator_space_display_name}</span>
      </StCreateDisplayName>
      <div>
        <CreateDescriptionHeader countType="R" />
        <StDescription>{kanbanItem?.description}</StDescription>
      </div>
      {kanbanItem?.assignees[0].userId !== null && (
        <div>
          <CreateBackDropTitle title="담당자" />
          <SelectAssigneesList tagType="labels" />
        </div>
      )}
    </StScrumItemDetailWrapper>
  );
}
