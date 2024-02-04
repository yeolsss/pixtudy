export interface Assign {
  id: string
  displayName: string
  avatar: string
}

export interface DropItem {
  categoryId: string
}

export interface AnimationInfo {
  initial: { opacity: number; y?: number }
  animate: { opacity: number; y?: number }
  exit: { opacity: number; y?: number }
  transition: { duration: number }
}

export type BackDropType = 'create' | 'detail' | 'update'
