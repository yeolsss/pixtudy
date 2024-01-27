import styled from "styled-components";
import CreateInput from "@/components/scrumboard/detail/createBackDrop/CreateInput";
import useCreateScrumButtons from "@/hooks/scrumBoard/useCreateScrumButtons";
import CreateBackDropCtaButton from "@/components/scrumboard/detail/createBackDrop/CreateBackDropCTAButton";
import CreateDescription from "@/components/scrumboard/detail/createBackDrop/CreateDescription";
import CreateAssignees from "@/components/scrumboard/detail/createBackDrop/CreateAssignees";

export default function CreateBackDrop() {
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
        <CreateInput />
        <CreateBackDropCtaButton
          buttonType={"submit"}
          forwardText={"생성"}
          handle={handleOnClickCreate}
        />
        <CreateBackDropCtaButton
          buttonType={"button"}
          forwardText={"취소"}
          handle={handleOnClickCancel}
        />
      </StCreateBackDropHeader>
      <CreateDescription />
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
const StCreateBackDropHeaderButtonWrapper = styled.div``;