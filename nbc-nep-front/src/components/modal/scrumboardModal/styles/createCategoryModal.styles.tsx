import styled from "styled-components";
import { StModalContainer } from "../../confirmModal/styles/confirmModal.styles";
import { StModalContents } from "../../spaceModals/styles/spaceModalCommens.styles";

export const StCreateCategoryModalContainer = styled(StModalContainer)`
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  border: 1px solid var(--color-neutral-200);
`;
export const StCreateCategoryModalContents = styled(StModalContents)`
  width: 100%;
`;
