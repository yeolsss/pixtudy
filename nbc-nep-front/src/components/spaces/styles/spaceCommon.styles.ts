import styled from "styled-components";
import { StInputWrapper } from "../JoinSpaceForm";

export const StCreateInputWrapper = styled(StInputWrapper)<{
  $isError: boolean;
}>`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
  align-items: flex-start;

  input,
  textarea {
    ${(props) =>
      props.$isError && `border-color: ${props.theme.color.danger[500]}`};
  }
`;

export const StFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
