import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import {
  StCreateBackDrop,
  StCreateBackDropHeader,
} from "@/components/scrumboard/styles/backdrop.styles";
import { fadeInOut } from "@/styles/animations";
import BackDropTypeButtonGroup from "@/components/scrumboard/libs/BackDropType";
import CreateInput from "@/components/scrumboard/detail/createBackDrop/CreateInput";
import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants";
import CreateDescription from "@/components/scrumboard/detail/createBackDrop/CreateDescription";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";
import ScrumItemDetail from "@/components/scrumboard/detail/ScrumItemDetail";

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
        <div>{backDropType && BackDropTypeButtonGroup(backDropType)}</div>
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
