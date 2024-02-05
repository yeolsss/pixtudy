import styled from "styled-components";

export const StListItem = styled.li<{ $isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[4]};
  align-self: stretch;
  padding: ${(props) => props.theme.spacing[12]};
  margin: 0;
  width: 100%;
  height: auto;
  border-radius: ${(props) => props.theme.border.radius[12]};
  ${(props) =>
    props.$isDragging
      ? `border: 2px solid ${props.theme.color.border.interactive.primary}`
      : `border : 1px solid ${props.theme.color.border.secondary}`};
  background-color: ${(props) => props.theme.color.bg.primary};
  cursor: grab;

  > p {
    color: ${(props) => props.theme.color.text.secondary};
    text-overflow: ellipsis;
    font-size: ${(props) => props.theme.unit[14]};
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 19.5px */
    letter-spacing: -0.26px;
    font-family: var(--main-font);
  }
`;

export const StUserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    height: 3rem;
    > p {
      flex: 1;
    }
  }
`;

export const StAvatar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const StAssigneesWrapper = styled(StAvatar)`
  position: relative;
  height: 3rem;
  flex: 1;
`;

export const StMetaAvatarWrapper = styled.div<{ $index: number }>`
  position: absolute;
  right: ${(props) => props.$index * 15}px;
  z-index: ${(props) => 1000 - props.$index};
`;
