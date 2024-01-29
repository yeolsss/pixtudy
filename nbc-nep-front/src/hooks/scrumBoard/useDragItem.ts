import { DropItem } from "@/components/scrumboard/types/scrumTypes";
import { GetKanbanItemsByAssignees } from "@/supabase/types/supabase.tables.type";
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
