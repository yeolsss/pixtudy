import CreateCategoryInputBox from "@/components/scrumboard/detail/createBackDrop/CreateCategoryInputBox";
import { StCreateInputBackDropWrapper } from "../../styles/backdrop.styles";

export default function CreateInput() {
  return (
    <StCreateInputBackDropWrapper>
      <CreateCategoryInputBox />
    </StCreateInputBackDropWrapper>
  );
}
