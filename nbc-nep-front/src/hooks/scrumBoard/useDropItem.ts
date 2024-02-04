import { updateCategoryItem } from '@/api/supabase/scrumBoard'
import { GetKanbanItemsByAssignees } from '@/types/supabase.tables.types'
import { useMutation } from '@tanstack/react-query'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { toast } from 'react-toastify'

export default function useDropItem(categoryId: string) {
  const updateMutate = useMutation({ mutationFn: updateCategoryItem })

  /**
   * TODO:
   * 이걸 어디로 뺀담.. 훅에 있는 게 맞나?
   */
  const handleDrop = (
    item: GetKanbanItemsByAssignees,
    targetCategoryId: string
  ) => {
    updateMutate.mutate({
      id: item.id,
      updateCategoryId: targetCategoryId
    }),
      {
        onSuccess: async () => {
          toast.success('카테고리가 변경되었습니다.')
        }
      }
  }

  const dropSpec = {
    accept: 'kanbanItem',
    drop: (item: GetKanbanItemsByAssignees, monitor: DropTargetMonitor) => {
      handleDrop(item, categoryId)
      return item
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      didDrop: !!monitor.didDrop(),
      dropResult: monitor.getDropResult()
    })
  }

  const [{ canDrop, isOver, didDrop, dropResult }, drop] = useDrop(dropSpec)

  return {
    canDrop,
    isOver,
    didDrop,
    dropResult,
    drop
  }
}
