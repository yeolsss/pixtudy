import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants/constants";
import ScrumItemDetail from "@/components/scrumboard/detail/ScrumItemDetail";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";
import CreateDescription from "@/components/scrumboard/detail/createBackDrop/CreateDescription";
import CreateInput from "@/components/scrumboard/detail/createBackDrop/CreateInput";
import BackDropTypeButtonGroup from "@/components/scrumboard/libs/BackDropType";
import useFocusInput from "@/hooks/metaverse/useFocusInput";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import styled from "styled-components";

export default function CreateBackDrop() {
  const backDropType = useScrumBoardItemBackDropStore.use.backDropType();

  const [handleFocus, handleBlur] = useFocusInput();

  return (
    <StCreateBackDrop onFocus={handleFocus} onBlur={handleBlur}>
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

const StCreateBackDrop = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 1100;
  right: 50px;
  width: 100%;
  min-width: 344px !important;
  max-width: 460px !important;
  background-color: ${(props) => props.theme.color.bg.primary};
  padding: ${(props) => props.theme.spacing[24]};
  border-radius: ${(props) => props.theme.border.radius[12]};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow4};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  gap: ${(props) => props.theme.spacing[24]};
`;

const StCreateBackDropHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex: 1 0 0;
  gap: ${(props) => props.theme.spacing[4]};
  & > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[12]};
  }
`;
