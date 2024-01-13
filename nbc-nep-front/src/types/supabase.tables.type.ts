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
}

export interface Dm_channels {
  id: string /* primary key */;
  space_id: string /* foreign key to spaces.id */;
  chat_users: any; // type unknown;
  spaces?: Spaces;
}

export interface Dm_messages {
  id: string /* primary key */;
  created_at: string;
  dm_id: string /* foreign key to dm_channels.id */;
  receiver_id: string /* foreign key to users.id */;
  message: string;
  sender_id: string /* foreign key to users.id */;
  dm_channels?: Dm_channels;
  users?: Users;
}

export interface Space_members {
  id: string /* primary key */;
  created_at: string;
  space_id: string /* foreign key to spaces.id */;
  user_id?: string /* foreign key to users.id */;
  spaces?: Spaces;
  users?: Users;
}

export interface getOtherUserHandlerArgs {
  otherUserId: string;
}
