import styled from "styled-components";

export const StSelectAssigneesListWrapper = styled.div<{ $tagType: boolean }>`
  width: 100%;
  border: 1px solid;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: ${({ $tagType }) => ($tagType ? "1px" : "0")} solid
    ${(props) => props.theme.color.border.secondary};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  gap: ${(props) => props.theme.spacing[8]};
  flex-wrap: wrap;
`;

export const StSelectAssigneesCard = styled.div`
  display: flex;
  padding: ${(props) => `${props.theme.spacing[4]} ${props.theme.spacing[8]}`};
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.border.radius.circle};
  background: rgba(239, 246, 255, 0.8);

  > span {
    color: ${(props) => props.theme.color.blue["600"]};
    text-overflow: ellipsis;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[14]};
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }
`;

export const StDeleteButton = styled.button`
  border: none;
  width: 12px;
  background-color: unset;
  height: 12px;
  padding: unset;
  &:hover {
    background-color: unset;
  }
`;

export const StCreateAssigneesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
`;

export const StCreateAssigneesInputWrapper = styled.div`
  position: relative;
`;
export const StCreateAssigneesInput = styled.input`
  outline: none;
  width: 100%;
  font-family: var(--main-font);
  font-size: ${(props) => props.theme.unit[14]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  background: ${(props) => props.theme.color.text.interactive.inverse};
  color: ${(props) => props.theme.color.text.tertiary};
  overflow: hidden;

  line-height: 150%;
  letter-spacing: -0.14px;
  &:focus {
    border-color: ${(props) => props.theme.color.border.focusRing};
  }
`;
