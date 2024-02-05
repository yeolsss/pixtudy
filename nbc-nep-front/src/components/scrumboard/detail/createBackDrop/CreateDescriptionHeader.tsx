import { SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH } from "@/components/scrumboard/constants";
import CreateBackDropTitle from "@/components/scrumboard/detail/createBackDrop/CreateBackDropTitle";
import { StCreateBackDropDescriptionHeader } from "../../styles/backdrop.styles";

interface Props {
  text?: string;
  countType: "C" | "R";
}
export default function CreateDescriptionHeader({ text, countType }: Props) {
  return (
    <StCreateBackDropDescriptionHeader>
      <CreateBackDropTitle title="내용" />
      <span>
        {countType === "C" &&
          `${text?.length}/${SCRUM_BOARD_TEXT_AREA_TEXT_MAX_LENGTH}`}
      </span>
    </StCreateBackDropDescriptionHeader>
  );
}

CreateDescriptionHeader.defaultProps = {
  text: "",
};
