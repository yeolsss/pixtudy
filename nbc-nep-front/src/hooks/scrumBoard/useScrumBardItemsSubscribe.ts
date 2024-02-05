import { useGetSpaceMembers } from "@/hooks/query/useSupabase";
import { supabase } from "@/supabase";
import { GetKanbanItemsByAssignees } from "@/types/supabase.tables.types";
import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
} from "@supabase/realtime-js";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useScrumBardItemsSubscribe(
  spaceId: string,
  categories: KanbanCategories[]
) {
  const setSpaceMembers = useScrumBoardMemberSearchStore.use.setSpaceMembers();
  const queryClient = useQueryClient();
  const spaceMembers = useGetSpaceMembers(spaceId);

  useEffect(() => {
    if (spaceMembers) {
      setSpaceMembers(spaceMembers);
    }
  }, [spaceMembers]);

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
}
