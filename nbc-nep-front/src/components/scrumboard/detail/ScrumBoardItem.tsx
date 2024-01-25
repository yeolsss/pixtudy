import styled from "styled-components";

export default function ScrumBoardItem() {
  return <StListItem>lorem ipsum dolor sit amet</StListItem>;
}

const StListItem = styled.li`
  padding: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[64]}px;
  background: ${(props) => props.theme.color.bg.primary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;
