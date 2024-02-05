import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import CreateDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader";
import SelectAssigneesList from "@/components/scrumboard/detail/createBackDrop/SelectAssigneesList";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import styled from "styled-components";

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
const StScrumItemDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[24]};
  > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }
`;
const StDescription = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  text-overflow: ellipsis;
  font-size: ${(props) => props.theme.unit[16]};
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.26px;
  font-family: var(--main-font);
`;

const StCreateDisplayName = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > span {
    font-size: ${(props) => props.theme.unit[14]};
  }
`;
