export interface Users {
  id: string /* primary key */;
  created_at: string;
  email: string;
  display_name?: string;
}

export interface Spaces {
  id: string /* primary key */;
  created_at: string;
  title: string;
  description: string;
  owner: string /* foreign key to users.id */;
  users?: Users;
  space_thumb: string | null;
}

export interface KanbanCategories {
  id: string /* primary key */;
  spaceId: string /* foreign key to spaces.id */;
  name: string;
  color: string;
  order: number;
  spaces?: Spaces;
}

export interface KanbanItems {
  id: string /* primary key */;
  created_at: string;
  title: string;
  description: string;
  deadline?: string;
  type: string;
  categoryId: string;
  kanban_categories?: KanbanCategories;
  // eslint-disable-next-line no-use-before-define
  kanban_assignees?: KanbanAssignees[];
}

export interface KanbanAssignees {
  assigneesId: string;
  spaceAvatar: string;
  userId: string;
  space_display_name: string;
  kanban_items?: KanbanItems;
  users?: Users;
}

export interface SpaceMembers {
  id: string /* primary key */;
  created_at: string;
  space_id: string /* foreign key to spaces.id */;
  user_id: string /* foreign key to users.id */;
  space_display_name: string;
  space_avatar: string;
  spaces?: Spaces;
  users?: Users;
}

export type GetKanbanItemsByAssignees = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  deadline: string;
  type: string;
  categoryId: string;
  item_creator_space_display_name: string;
  item_creator_space_avatar: string;
  create_user_id: string;
  space_id?: string;
  assignees: KanbanAssignees[];
};
