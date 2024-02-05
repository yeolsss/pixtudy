import styled from "styled-components";
import {
  StModalContainer,
  StModalContents,
} from "../../spaceModals/styles/spaceModalCommens.styles";

export const StCreateCategoryModalContainer = styled(StModalContainer)`
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  border: 1px solid var(--color-neutral-200);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2400;
  background: white;
  border-radius: var(--size-8);
`;
export const StCreateCategoryModalContents = styled(StModalContents)`
  width: 100%;
`;
