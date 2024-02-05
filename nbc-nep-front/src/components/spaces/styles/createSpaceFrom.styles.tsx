import styled from "styled-components";
import { StContentsContainer } from "../JoinSpaceForm";

export const StCreateSpaceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

export const StCreateContentsContainer = styled(StContentsContainer)`
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[16]};
  }

  & + div {
    width: 100%;
  }
`;
