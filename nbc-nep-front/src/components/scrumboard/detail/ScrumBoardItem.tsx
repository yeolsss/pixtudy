import styled from "styled-components";
import { Kanban_items } from "@/supabase/types/supabase.tables.type";

interface Props {
  item: Kanban_items;
}
export default function ScrumBoardItem({ item }: Props) {
  console.log(item);
  return <StListItem>{item.description}</StListItem>;
}

const StListItem = styled.li`
  padding: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[64]}px;
  background: ${(props) => props.theme.color.bg.primary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;
