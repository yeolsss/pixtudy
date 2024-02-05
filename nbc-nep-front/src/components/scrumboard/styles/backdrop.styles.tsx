import { motion } from "framer-motion";
import styled from "styled-components";

export const StBackDropTextArea = styled.textarea<{
  $fontSize: number;
  $validState: boolean;
}>`
  outline: none;
  width: 100%;
  min-height: 70px;
  height: auto;
  font-family: var(--main-font);
  font-size: ${({ $fontSize }) => $fontSize}px;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid
    ${({ theme, $validState }) =>
      $validState ? theme.color.border.danger : theme.color.border.secondary};
  background: ${(props) => props.theme.color.text.interactive.inverse};
  color: ${(props) => props.theme.color.text.tertiary};
  overflow: hidden;
  line-height: 150%;
  letter-spacing: -0.14px;
  &:focus {
    border-color: ${({ theme, $validState }) =>
      $validState ? theme.color.border.danger : theme.color.border.focusRing};
  }
`;

export const StAssigneesBackDropWrapper = styled.ul<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  width: 100%;
  padding: ${(props) => props.theme.spacing[12]};
  background-color: ${(props) => props.theme.color.bg.primary};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StAssigneesBackDropItemNoSearch = styled.li`
  width: 100%;
  height: ${(props) => props.theme.spacing[32]};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  > span {
    color: ${(props) => props.theme.color.text.secondary};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.unit[12]};
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 11px */
    letter-spacing: -0.11px;
  }
`;

export const StAssigneesBackDropItem = styled(StAssigneesBackDropItemNoSearch)`
  cursor: pointer;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[24]} ${(props) =>
    props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  &:hover {
    box-shadow: ${(props) => props.theme.elevation.Light.shadow16};
  }
`;

export const StCreateBackDropCtaButton = styled.button`
  border: none;
  font-size: ${(props) => props.theme.unit[14]};
  font-family: var(--point-font);
  font-weight: 300;
  padding: ${(props) => props.theme.spacing[8]} 0;
  color: ${(props) => props.theme.color.text.primary};
  opacity: 0.3;
  &:hover {
    background-color: unset;
    color: ${(props) => props.theme.color.text.primary};
    opacity: 1;
  }
`;

export const StCreateBackDropTitle = styled.h2`
  color: ${(props) => props.theme.color.text.primary};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.unit[14]};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

export const StCreateCategoryBackDropWrapper = styled.div<{
  $isOpen: boolean;
}>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  left: 0;
  width: ${(props) => props.theme.unit[128]};
  flex-direction: column;
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: ${(props) => props.theme.color.bg.primary};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  z-index: 100;
`;

export const StCreateCategoryBackDrop = styled.div`
  width: 100%;
  height: ${(props) => props.theme.spacing[32]};
  padding: ${(props) => props.theme.spacing[8]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${(props) =>
    `${props.theme.spacing[24]} ${props.theme.spacing[12]}`};

  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
  }

  color: ${(props) => props.theme.color.text.secondary};
  font-family: var(--point-font);
  font-size: ${(props) => props.theme.unit[12]};
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.11px;
  &:nth-child(1) {
    border-radius: ${(props) =>
      `${props.theme.border.radius["8"]} ${props.theme.border.radius["8"]} 0 0`};
  }
  &:nth-last-child(1) {
    border-radius: ${(props) =>
      `0 0 ${props.theme.border.radius["8"]} ${props.theme.border.radius["8"]}`};
  }
`;

export const StCreateInputBackDropWrapper = styled.div`
  position: relative;
  width: 275px;
  padding: ${(props) => props.theme.spacing[4]};
`;

export const StCreateBackDrop = styled(motion.div)`
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

export const StCreateBackDropHeader = styled.div`
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

export const StCreateBackDropDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing[8]};
`;

export const StCreateBackDropDescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #5e6066;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[12]};
    font-weight: 400;
    line-height: 100%;
  }
`;
