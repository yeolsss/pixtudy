import Link from "next/link";
import styled from "styled-components";

export const StHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing[16]};
  padding: 0 ${(props) => props.theme.spacing[16]};
  button {
    height: ${(props) => props.theme.unit[48]};
    padding-top: ${(props) => props.theme.spacing[12]};
    padding-bottom: ${(props) => props.theme.spacing[12]};
    padding-right: ${(props) => props.theme.spacing[24]};
    padding-left: ${(props) => props.theme.spacing[24]};
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
  }
`;

export const StNavContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[32]};
  align-items: center;
  button {
    position: relative;
    border: none;
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.md.fontSize};
    color: ${(props) => props.theme.color.text.disabled};
    padding: 0;
    &:hover {
      background-color: #fff;
      color: ${(props) =>
        props.theme.color.text.interactive["secondary-pressed"]};
    }
  }
`;

export const StButtonContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[12]};
  & > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[12]};
  }
`;

export const StLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StLine = styled.div`
  width: 0px;
  height: ${(props) => props.theme.body.md.medium.fontSize};
  border: 1px solid
    ${(props) => props.theme.color.text.interactive["secondary-pressed"]};
`;

export const StLink = styled(Link)<{ $isSelected: boolean }>`
  position: relative;
  border: none;

  font-family: var(--point-font);
  ${(props) => props.$isSelected && `color: var(--color-neutral-400);`};

  font-size: ${(props) => props.theme.body.lg.medium.fontSize};
  font-weight: ${(props) => props.theme.body.lg.medium.fontWeight};

  vertical-align: bottom;
  padding: 0;

  display: inline-block;
`;
