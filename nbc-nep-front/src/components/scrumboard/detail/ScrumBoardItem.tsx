import styled from "styled-components";
import { GetKanbanItemsByAssignees } from "@/supabase/types/supabase.tables.type";
import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";

interface Props {
  item: GetKanbanItemsByAssignees;
}
export default function ScrumBoardItem({ item }: Props) {
  return (
    <StListItem>
      <StAvatar>
        <MetaAvatar spaceAvatar={item.item_creator_space_avatar} />
      </StAvatar>
      <p>{item.description}</p>
    </StListItem>
  );
}

const StListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[4]};
  align-self: stretch;
  padding: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[64]}px;
  border-radius: ${(props) => props.theme.border.radius[12]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  background-color: ${(props) => props.theme.color.bg.primary};
`;

const StAvatar = styled.div``;
