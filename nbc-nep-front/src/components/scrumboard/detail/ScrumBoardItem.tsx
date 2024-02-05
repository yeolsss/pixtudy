import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import { BACK_DROP_TYPE_DETAIL } from "@/components/scrumboard/constants/constants";
import useDragItem from "@/hooks/scrumBoard/useDragItem";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/types/supabase.tables.types";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import React from "react";
import styled from "styled-components";

interface Props {
  item: GetKanbanItemsByAssignees;
  category: Kanban_categories;
}

function ScrumBoardItem({ category, item }: Props) {
  const setIsOpen = useScrumBoardItemBackDropStore.use.setIsOpen();
  const handleOpenItemDetail = (item: GetKanbanItemsByAssignees) => {
    setIsOpen(category, item, BACK_DROP_TYPE_DETAIL);
  };
  const { drag, didDrop, targetCategoryId, isDragging } = useDragItem(item);

  return (
    <StListItem
      ref={drag}
      $isDragging={isDragging}
      onClick={() => handleOpenItemDetail(item)}
    >
      <p>{item.description}</p>
      <StUserInfoWrapper>
        <div>
          <p>{item.item_creator_space_display_name}</p>
        </div>
        {item.assignees[0].userId !== null && (
          <StAssigneesWrapper>
            {item.assignees.map((assignee, index) => {
              return (
                <StMetaAvatarWrapper $index={index} key={index}>
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
      </StUserInfoWrapper>
    </StListItem>
  );
}

const StListItem = styled.li<{ $isDragging: boolean }>`
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

const StUserInfoWrapper = styled.div`
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

const StAvatar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StAssigneesWrapper = styled(StAvatar)`
  position: relative;
  height: 3rem;
  flex: 1;
`;

const StMetaAvatarWrapper = styled.div<{ $index: number }>`
  position: absolute;
  right: ${(props) => props.$index * 15}px;
  z-index: ${(props) => 1000 - props.$index};
`;

export default React.memo(ScrumBoardItem);
