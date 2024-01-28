import { StCTAButton } from "@/components/common/button/button.styles";
import ModalPortal from "@/components/modal/ModalPortal";
import CreateCategoryModal from "@/components/modal/scrumboardModal/CreateCategoryModal";
import CreateBackDrop from "@/components/scrumboard/detail/CreateBackDrop";
import useModal from "@/hooks/modal/useModal";
import { useGetCategories } from "@/hooks/query/useSupabase";
import useScrumBoard from "@/hooks/scrumBoard/useScrumBoard";
import { supabase } from "@/supabase/supabase";
import { GetKanbanItemsByAssignees } from "@/supabase/types/supabase.tables.type";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
} from "@supabase/realtime-js";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";

export default function ScrumBoard() {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const { openCreateCategoryModal, isCreateCategoryModalOpen } = useModal();
  const { setCategories } = useScrumBoard();
  const categories = useGetCategories(spaceId);
  const { isOpen: isCreateBackDropOpen } = useScrumBoardItemBackDrop();
  const [{ isOver }, drop] = useDrop({
    accept: ["category"],
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const queryClient = useQueryClient();
  /*
   * 카테고리 아이템 추가 삭제시
   * */

  useEffect(() => {
    const handleChangeObserver = (
      payload:
        | RealtimePostgresChangesPayload<GetKanbanItemsByAssignees>
        | RealtimePostgresInsertPayload<GetKanbanItemsByAssignees>
        | RealtimePostgresDeletePayload<GetKanbanItemsByAssignees>
    ) => {
      if ("space_id" in payload.new) {
        if (payload.new?.space_id === spaceId) {
          categories?.forEach(async (category) => {
            await queryClient.invalidateQueries({
              queryKey: ["categoryItem", category.id],
            });
          });
        }
      } else {
        categories?.forEach(async (category) => {
          await queryClient.invalidateQueries({
            queryKey: ["categoryItem", category.id],
          });
        });
      }
    };

    const subscription = supabase
      .channel("kanban_items")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "kanban_items" },
        handleChangeObserver
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "kanban_items" },
        handleChangeObserver
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "kanban_items" },
        handleChangeObserver
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [spaceId, categories]);

  useEffect(() => {
    setCategories(categories!);
  }, [categories]);

  const handleAddCategory = () => {
    openCreateCategoryModal();
  };

  return (
    <StScrumBoardWrapper>
      <StScrumBoardContainer>
        <div ref={drop}>
          {categories?.map((category) => {
            return <ScrumBoardCategory key={category.id} category={category} />;
          })}
          <div>
            <StAddCategoryBtn onClick={handleAddCategory}>
              add category
            </StAddCategoryBtn>
          </div>
        </div>
      </StScrumBoardContainer>
      {isCreateCategoryModalOpen && (
        <ModalPortal>
          <CreateCategoryModal />
        </ModalPortal>
      )}
      {isCreateBackDropOpen && <CreateBackDrop />}
    </StScrumBoardWrapper>
  );
}

const StScrumBoardWrapper = styled.div`
  position: relative;
`;

const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0 auto;
  position: relative;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
    border: 3px solid blue;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]}px;
`;
