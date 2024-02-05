import styled from "styled-components";
import { StInputWrapper } from "./joinSpaceForm.styles";

// prettier-ignore
export const StCreateInputWrapper = styled(StInputWrapper)<{$isError: boolean}>`
  display: flex;
  position: relative;
  height: auto;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
  align-items: flex-start;

  input,
  textarea {
    ${(props) =>
      props.$isError && `border-color: ${props.theme.color.danger[500]}`};
  }
  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }
`;

export const StFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
