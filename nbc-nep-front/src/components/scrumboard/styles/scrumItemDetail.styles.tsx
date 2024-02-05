import styled from "styled-components";

export const StScrumItemDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[24]};
  > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }
`;
export const StDescription = styled.p`
  color: ${(props) => props.theme.color.text.secondary};
  text-overflow: ellipsis;
  font-size: ${(props) => props.theme.unit[16]};
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.26px;
  font-family: var(--main-font);
`;

export const StCreateDisplayName = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > span {
    font-size: ${(props) => props.theme.unit[14]};
  }
`;
