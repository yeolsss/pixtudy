import styled from "styled-components";

export const StScrumBoardListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing[24]};
`;
