import { Json } from "./supabase";

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

export interface Kanban_items {
  id: string /* primary key */;
  created_at: string;
  spaceId: string /* foreign key to spaces.id */;
  title: string;
  description: string;
  deadline?: string;
  category: Json;
  spaces?: Spaces;
}

export interface Kanban_assignees {
  id: string /* primary key */;
  kanbanItemId: string /* foreign key to kanban_items.id */;
  userId: string /* foreign key to users.id */;
  kanban_items?: Kanban_items;
  users?: Users;
}

export interface Brainstormings {
  id: string /* primary key */;
  created_at: string;
  contents: string;
  userId: string /* foreign key to users.id */;
  spaceId: string /* foreign key to spaces.id */;
  users?: Users;
  spaces?: Spaces;
}

export interface Dm_channels {
  id: string /* primary key */;
  space_id: string /* foreign key to spaces.id */;
  user: string /* foreign key to users.id */;
  other_user?: string /* foreign key to users.id */;
  spaces?: Spaces;
  users?: Users;
}

export interface Dm_messages {
  id: string /* primary key */;
  created_at: string;
  dm_id: string /* foreign key to dm_channels.id */;
  receiver_id: string /* foreign key to users.id */;
  message: string;
  sender_id: string /* foreign key to users.id */;
  checked: string;
  dm_channels?: Dm_channels;
  users?: Users;
}

export interface Space_members {
  id: string /* primary key */;
  created_at: string;
  space_id: string /* foreign key to spaces.id */;
  user_id: string /* foreign key to users.id */;
  space_display_name: string;
  space_avatar: string;
  spaces?: Spaces;
  users?: Users;
}

export type SpaceMembers = {
  space_id: string;
  users: {
    id: string;
  };
};
