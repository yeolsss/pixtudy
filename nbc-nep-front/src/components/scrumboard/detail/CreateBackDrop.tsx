import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants";
import ScrumItemDetail from "@/components/scrumboard/detail/ScrumItemDetail";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";
import CreateDescription from "@/components/scrumboard/detail/createBackDrop/CreateDescription";
import CreateInput from "@/components/scrumboard/detail/createBackDrop/CreateInput";
import BackDropTypeButtonGroup from "@/components/scrumboard/libs/BackDropType";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import { fadeInOut } from "@/styles/animations";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import {
  StCreateBackDrop,
  StCreateBackDropHeader,
} from "../styles/backdrop.styles";

export default function CreateBackDrop() {
  const backDropType = useScrumBoardItemBackDropStore.use.backDropType();

  const [handleFocus, handleBlur] = useFocusInput();

  return (
    <StCreateBackDrop
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...fadeInOut({ x: -5, y: 5 })}
    >
      <StCreateBackDropHeader>
        <CreateInput />
        <div>{BackDropTypeButtonGroup(backDropType)}</div>
      </StCreateBackDropHeader>
      {backDropType === BACK_DROP_TYPE_CREATE ||
      backDropType === BACK_DROP_TYPE_UPDATE ? (
        <>
          <CreateDescription />
          <CreateAssignees />
        </>
      ) : (
        <ScrumItemDetail />
      )}
    </StCreateBackDrop>
  );
}
