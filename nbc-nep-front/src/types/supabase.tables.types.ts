export interface Users {
  id: string /* primary key */
  created_at: string
  email: string
  display_name?: string
}

export interface Spaces {
  id: string /* primary key */
  created_at: string
  title: string
  description: string
  owner: string /* foreign key to users.id */
  users?: Users
  space_thumb: string | null
}

export interface Kanban_categories {
  id: string /* primary key */
  spaceId: string /* foreign key to spaces.id */
  name: string
  color: string
  order: number
  spaces?: Spaces
}

export interface Dm_channels {
  id: string /* primary key */
  space_id: string /* foreign key to spaces.id */
  user: string /* foreign key to users.id */
  other_user?: string /* foreign key to users.id */
  spaces?: Spaces
  users?: Users
}

export interface Kanban_items {
  id: string /* primary key */
  created_at: string
  title: string
  description: string
  deadline?: string
  type: string
  categoryId: string /* foreign key to kanban_categories.id */
  kanban_categories?: Kanban_categories
  kanban_assignees?: Kanban_assignees[]
}

export interface Kanban_assignees {
  id: string /* primary key */
  kanbanItemId: string /* foreign key to kanban_items.id */
  userId: string /* foreign key to users.id */
  kanban_items?: Kanban_items
  users?: Users
}

export interface Dm_messages {
  id: string /* primary key */
  created_at: string
  dm_id: string /* foreign key to dm_channels.id */
  receiver_id: string /* foreign key to users.id */
  message: string
  sender_id: string /* foreign key to users.id */
  checked: string
  dm_channels?: Dm_channels
  users?: Users
}

export interface Space_members {
  id: string /* primary key */
  created_at: string
  space_id: string /* foreign key to spaces.id */
  user_id: string /* foreign key to users.id */
  space_display_name: string
  space_avatar: string
  spaces?: Spaces
  users?: Users
}

export type SpaceMembers = {
  space_id: string
  users: {
    id: string
  }
}

export type GetKanbanItemsByAssignees = {
  id: string
  created_at: string
  title: string
  description: string
  deadline: string
  type: string
  categoryId: string
  item_creator_space_display_name: string
  item_creator_space_avatar: string
  create_user_id: string
  space_id?: string
  assignees: KanbanAssignees[]
}

export type KanbanAssignees = {
  assigneesId: string
  spaceAvatar: string
  userId: string
  space_display_name: string
}
