import styled from "styled-components";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/supabase/types/supabase.tables.type";
import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import React from "react";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import { BACK_DROP_TYPE_DETAIL } from "@/components/scrumboard/constants/constants";

interface Props {
  item: GetKanbanItemsByAssignees;
  category: Kanban_categories;
}
function ScrumBoardItem({ category, item }: Props) {
  const { setIsOpen } = useScrumBoardItemBackDrop();
  const handleOpenItemDetail = (item: GetKanbanItemsByAssignees) => {
    setIsOpen(category, item, BACK_DROP_TYPE_DETAIL);
  };
  return (
    <StListItem onClick={() => handleOpenItemDetail(item)}>
      <StAvatar>
        <MetaAvatar spaceAvatar={item.item_creator_space_avatar} />
      </StAvatar>
      <p>{item.description}</p>
      {item.assignees[0].userId !== null && (
        <StAssigneesWrapper>
          {item.assignees.map((assignee, index) => {
            return (
              <StMetaAvatarWrapper key={index} $index={index}>
                <MetaAvatar
                  spaceAvatar={assignee.spaceAvatar}
                  width={24}
                  height={24}
                  y={39}
                  x={-5}
                />
              </StMetaAvatarWrapper>
            );
          })}
        </StAssigneesWrapper>
      )}
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
  height: auto;
  border-radius: ${(props) => props.theme.border.radius[12]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  background-color: ${(props) => props.theme.color.bg.primary};
  cursor: grab;

  > p {
    color: ${(props) => props.theme.color.text.secondary};
    text-overflow: ellipsis;
    font-size: ${(props) => props.theme.unit[14]}px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 19.5px */
    letter-spacing: -0.26px;
    font-family: var(--main-font);
  }
`;

const StAvatar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StAssigneesWrapper = styled(StAvatar)`
  position: relative;
  height: 30px;
`;

const StMetaAvatarWrapper = styled.div<{ $index: number }>`
  position: absolute;
  right: ${(props) => props.$index * 15}px;
  z-index: ${(props) => 1000 - props.$index};
`;

export default React.memo(ScrumBoardItem);
