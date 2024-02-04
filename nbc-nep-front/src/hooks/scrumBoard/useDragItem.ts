import { DropItem } from "@/types/scrum.types";
import { GetKanbanItemsByAssignees } from "@/types/supabase.tables.types";
import { DragSourceMonitor, useDrag } from "react-dnd";

export default function useDragItem(item: GetKanbanItemsByAssignees) {
  const dragSpec = {
    type: "kanbanItem",
    item,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
      targetCategoryId: monitor.getDropResult<DropItem>(),
      didDrop: !!monitor.didDrop(),
    }),
    end: (item: GetKanbanItemsByAssignees, monitor: DragSourceMonitor) => {},
  };

  const [{ targetCategoryId, isDragging, didDrop }, drag] = useDrag(dragSpec);

  return {
    targetCategoryId,
    isDragging,
    didDrop,
    drag,
  };
}
