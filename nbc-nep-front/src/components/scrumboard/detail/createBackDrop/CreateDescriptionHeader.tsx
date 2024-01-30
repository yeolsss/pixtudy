import { SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH } from "@/components/scrumboard/constants/constants";
import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import styled from "styled-components";

interface Props {
  text?: string;
  countType: "C" | "R";
}
export default function CreateDescriptionHeader({ text, countType }: Props) {
  return (
    <StCreateBackDropDescriptionHeader>
      <CreateBackDropTitle title={"내용"} />
      <span>
        {countType === "C" &&
          `${text?.length}/${SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH}`}
      </span>
    </StCreateBackDropDescriptionHeader>
  );
}

const StCreateBackDropDescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #5e6066;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[12]};
    font-weight: 400;
    line-height: 100%;
  }
`;
