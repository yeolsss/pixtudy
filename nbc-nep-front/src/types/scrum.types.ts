export type Assign = {
  id: string
  displayName: string
  avatar: string
}

export type DropItem = {
  categoryId: string
}

export type AnimationInfo = {
  initial: { opacity: number; y?: number }
  animate: { opacity: number; y?: number }
  exit: { opacity: number; y?: number }
  transition: { duration: number }
}

export type BackDropType = 'create' | 'detail' | 'update'
