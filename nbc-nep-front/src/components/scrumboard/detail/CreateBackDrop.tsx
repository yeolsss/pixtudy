import styled from "styled-components";
import CreateInput from "@/components/scrumboard/detail/createBackDrop/CreateInput";
import CreateDescription from "@/components/scrumboard/detail/createBackDrop/CreateDescription";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import ScrumItemDetail from "@/components/scrumboard/detail/ScrumItemDetail";
import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants/constants";
import BackDropTypeButtonGroup from "@/components/scrumboard/libs/BackDropType";

export default function CreateBackDrop() {
  const { backDropType } = useScrumBoardItemBackDrop();

  return (
    <StCreateBackDrop>
      <StCreateBackDropHeader>
        <CreateInput />

        {BackDropTypeButtonGroup(backDropType)}
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
  min-width: 344px;
  max-width: 460px;
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
`;
