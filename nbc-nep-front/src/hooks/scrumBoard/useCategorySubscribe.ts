import { supabase } from "@/supabase/supabase";
import { Kanban_categories } from "@/types/supabase.tables.types";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useCategorySubscribe(spaceId: string) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleChangeObserver = (
      payload:
        | RealtimePostgresChangesPayload<Kanban_categories>
        | RealtimePostgresInsertPayload<Kanban_categories>
        | RealtimePostgresDeletePayload<Kanban_categories>
    ) => {
      if ("space_id" in payload.new) {
        if (payload.new?.space_id === spaceId) {
          queryClient.invalidateQueries({
            queryKey: ["categoryList", spaceId],
          });
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["categoryList", spaceId] });
      }
    };

    const subscription = supabase
      .channel("kanban_categories")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "kanban_categories" },
        handleChangeObserver
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "kanban_categories" },
        handleChangeObserver
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "kanban_categories" },
        handleChangeObserver
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [spaceId]);
}
