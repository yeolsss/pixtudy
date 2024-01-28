import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
} from "@supabase/realtime-js";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/supabase/types/supabase.tables.type";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { supabase } from "@/supabase/supabase";

export default function useScrumBardItemsSubscribe(
  spaceId: string,
  categories: Kanban_categories[]
) {
  const queryClient = useQueryClient();
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
