import styled from "styled-components";
import CreateInputBackDrop from "@/components/scrumboard/detail/createBackDrop/CreateInputBackDrop";
import useCreateScrumButtons from "@/hooks/scrumBoard/useCreateScrumButtons";
import CreateBackDropCtaButton from "@/components/scrumboard/detail/createBackDrop/CreateBackDropCTAButton";
import CreateBackDropDescription from "@/components/scrumboard/detail/createBackDrop/CreateBackDropDescription";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";

export default function BackDrop() {
  const {
    handleOnClickCreate,
    handleOnClickUpdate,
    handleOnClickCancel,
    handleOnClickDelete,
  } = useCreateScrumButtons();
  return (
    <StCreateBackDrop>
      {/*생성*/}
      <StCreateBackDropHeader>
        <CreateInputBackDrop />
        <CreateBackDropCtaButton
          forwardText={"생성"}
          handle={handleOnClickCreate}
        />
        <CreateBackDropCtaButton
          forwardText={"취소"}
          handle={handleOnClickCancel}
        />
      </StCreateBackDropHeader>
      <CreateBackDropDescription />
      <CreateAssignees />
      {/* 생성 끝 */}
    </StCreateBackDrop>
  );
}

const StCreateBackDrop = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 50px;
  width: 100%;
  min-width: 344px;
  max-width: 460px;
  padding: ${(props) => props.theme.spacing[24]};
  border-radius: ${(props) => props.theme.border.radius[12]};
  box-shadow: 0 4px 8px 3px rgba(42, 39, 65, 0.1);
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
const StCreateBackDropHeaderButtonWrapper = styled.div``;
