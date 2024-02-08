import DefaultSpanText from "@/components/common/text/DefaultSpanText";
import styled from "styled-components";

export const StCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  > h1 {
    font-family: var(--point-font);
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.15px;
    font-size: ${(props) => props.theme.unit[16]};
    padding: ${(props) => props.theme.unit[4]} ${(props) => props.theme.unit[4]}
      ${(props) => props.theme.unit[4]} 0;
  }
  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.theme.unit[32]};
    height: ${(props) => props.theme.unit[32]};
  }
`;

export const StDropdownMenuContainer = styled.ul`
  position: absolute;
  bottom: -${(props) => props.theme.unit[24]};
  left: ${(props) => props.theme.unit[24]};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow2};
`;

export const StDropdownMenuItem = styled.li<{ $type: string }>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.theme.unit[80]};
  padding: ${(props) => props.theme.spacing[12]};
  cursor: pointer;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.semibold.fontSize};

  & > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("/assets/${(props) => props.$type}.svg") no-repeat center;
    background-size: contain;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
  }

  &:nth-child(1) {
    border-top-left-radius: ${(props) => props.theme.border.radius[12]};
    border-top-right-radius: ${(props) => props.theme.border.radius[12]};
    padding-bottom: ${(props) => props.theme.spacing[8]};
  }

  &:nth-child(2) {
    border-bottom-left-radius: ${(props) => props.theme.border.radius[12]};
    border-bottom-right-radius: ${(props) => props.theme.border.radius[12]};
    padding-top: ${(props) => props.theme.spacing[8]};
  }
`;

export const StCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[20]};
`;

export const StCategoryInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[8]};
  & > h1 {
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  }
`;

export const StItemCounter = styled.p`
  align-self: end;
  padding-right: ${(props) => props.theme.spacing[24]};
  opacity: 0.3;
  margin-bottom: -${(props) => props.theme.unit[2]};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
`;

export const StCategoryColor = styled.span<{ $color: string }>`
  display: block;
  width: ${(props) => props.theme.unit[12]};
  height: ${(props) => props.theme.unit[12]};
  margin-bottom: ${(props) => props.theme.unit[2]};
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
  background-color: ${(props) => props.$color};
`;

export const StDropDownMenuBtnWrapper = styled.div`
  position: relative;
  & > button {
    position: relative;
    display: block;
    opacity: 0.2;
    background-color: transparent;
    background-image: url("/assets/dropdown.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: ${(props) => props.theme.unit[20]};
    height: ${(props) => props.theme.unit[20]};
    padding: 0;
    border: none;
    font-size: 0;
    &:hover {
      opacity: 1;
      background-color: inherit;
    }
  }
`;

export const StCreateCategoryForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[16]};

  & > div {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }

  & > div > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
  }

  & h3 {
    font-size: ${(props) => props.theme.body.lg.medium.fontSize};
    font-family: var(--sub-font);
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
  }
`;

export const StCategoryItemWrapper = styled.div<{ $isSelected: boolean }>`
  opacity: ${(props) => (props.$isSelected ? 1 : 0.2)};
  transition: opacity 0.2s all;

  border-radius: ${(props) => props.theme.border.radius.circle};
  input {
    display: none;
  }
`;

export const StCategoryColorItem = styled.div<{
  $color: string;
  $isSelected: boolean;
}>`
  padding: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.blue[100]
      : props.theme.color.bg.secondary};
  &:hover {
    background-color: ${(props) => props.theme.color.blue[300]};
  }
  & > label {
    display: block;
    width: ${(props) => props.theme.unit[16]};
    height: ${(props) => props.theme.unit[16]};
    border-radius: ${(props) => props.theme.border.radius.circle};
    padding: 12px;
    background-color: ${(props) => props.$color};
    background-image: ${(props) =>
      props.$isSelected ? `url('/assets/selected.svg')` : "none"};
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center 60%;
  }
`;

export const StCategoryForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing[12]};
  height: ${(props) => props.theme.unit[20]};

  & > input {
    flex-shrink: 1;
    width: 100%;
    height: ${(props) => props.theme.unit[16]};
    padding: ${(props) => props.theme.spacing[12]} 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
  }
  & > input:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.color.border.focusRing};
  }
`;

export const StDropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: ${(props) => props.theme.unit[24]};
  left: -${(props) => props.theme.unit[4]};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow2};
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StDropdownButton = styled.div<{ $isOpen: boolean }>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.theme.unit[16]};
  font-size: 0;
  cursor: pointer;
  & > span {
    font-size: 0;
    width: ${(props) => props.theme.unit[14]};
    height: ${(props) => props.theme.unit[16]};
    background-image: url("/assets/dropdownArrow.svg");
    transform: ${(props) =>
      props.$isOpen ? "rotateX(0deg)" : "rotateX(180deg)"};
  }
`;

export const StSelectedColor = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: ${(props) => props.theme.unit[12]};
  height: ${(props) => props.theme.unit[12]};
  border-radius: ${(props) => props.theme.border.radius.circle};
  font-size: 0;
`;

export const StColorOption = styled.div<{
  $color: string;
  $isSelected: boolean;
}>`
  display: flex;
  padding: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.blue[100]
      : props.theme.color.bg.secondary};
  cursor: pointer;
  flex-direction: column;
  &:hover {
    background-color: ${(props) => props.theme.color.blue[300]};
  }
  & > span {
    width: ${(props) => props.theme.unit[12]};
    height: ${(props) => props.theme.unit[12]};
    border-radius: ${(props) => props.theme.border.radius.circle};
    font-size: 0;
    background-color: ${(props) => props.$color};
    background-image: ${(props) =>
      props.$isSelected ? `url('/assets/selected.svg')` : "none"};
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center 60%;
  }
  &:first-child {
    padding-top: ${(props) => props.theme.spacing[8]};
    border-top-left-radius: ${(props) => props.theme.border.radius[8]};
    border-top-right-radius: ${(props) => props.theme.border.radius[8]};
  }
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing[8]};
    border-bottom-left-radius: ${(props) => props.theme.border.radius[8]};
    border-bottom-right-radius: ${(props) => props.theme.border.radius[8]};
  }
`;

export const StEditSubmitButton = styled.button`
  width: ${(props) => props.theme.unit[96]};
  height: ${(props) => props.theme.unit[40]};
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  background-color: ${(props) => props.theme.color.bg.interactive.primary};
  color: ${(props) => props.theme.color.base.white};
  border: 0;
  &:hover {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-hovered"]};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.color.bg.interactive["primary-pressed"]};
  }
`;

export const StEditErrorMessage = styled(DefaultSpanText)`
  top: ${(props) => props.theme.unit[24]};
  left: ${(props) => props.theme.unit[40]};
`;
