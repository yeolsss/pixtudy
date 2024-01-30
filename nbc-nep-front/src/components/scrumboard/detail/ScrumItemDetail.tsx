import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import CreateDescriptionHeader from "@/components/scrumboard/detail/createBackDrop/CreateDescriptionHeader";
import SelectAssigneesList from "@/components/scrumboard/detail/createBackDrop/SelectAssigneesList";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import styled from "styled-components";

export default function ScrumItemDetail() {
  const { kanbanItem } = useScrumBoardItemBackDrop();

  return (
    <StScrumItemDetailWrapper>
      <div>
        <CreateDescriptionHeader countType={"R"} />
        <StDescription>{kanbanItem?.description}</StDescription>
      </div>
      {kanbanItem?.assignees[0].userId !== null && (
        <div>
          <CreateBackDropTitle title={"담당자"} />
          <SelectAssigneesList tagType={"labels"} />
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
  font-size: ${(props) => props.theme.unit[14]};
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.26px;
  font-family: var(--main-font);
`;
