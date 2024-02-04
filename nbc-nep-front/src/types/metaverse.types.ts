import { StaticImageData } from "next/image";

export type dmChatAlarmState = {
  dm_id: string;
  state: boolean;
};

export type ChatType = "GLOBAL" | "DM";

export type Config = "SPACE_CONFIG" | "VIDEO_CONFIG" | "CHAT_CONFIG";

export type Player = {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  nickname: string;
  character: string;
  frame: string;
  spaceId: string;
  state: PlayerState;
};

export type MapData = {
  objLayer: Phaser.Tilemaps.TilemapLayer | null;
  tileLayer: Phaser.Tilemaps.TilemapLayer | null;
  map: Phaser.Tilemaps.Tilemap;
};

export type Chat = {
  userId: string;
  message: string;
  playerDisplayName: string;
  playerId: string;
  chatTime: Date;
};

export enum PlayerState {
  ONLINE,
  EATING,
  LEFT_SEAT,
  DISTURB,
}

export type DMListCard = {
  room_id: string;
  message_id: string;
  created_at: string;
  message: string;
  space_id: string;
  space_title: string;
  sender_id: string;
  sender_username: string;
  sender_avatar: string;
  sender_display_name: string;
  receiver_id: string;
  receiver_username: string;
  receiver_avatar: string;
  receiver_display_name: string;
  unread_count: number;
};

export type Game = Phaser.Game;

export interface HandleOpenDmContainerPrams {
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
}

export type ButtonType =
  | "chat"
  | "settings"
  | "report"
  | "playerList"
  | "close"
  | "kanban";

export type IconButtonProperty = {
  buttonImage: StaticImageData | string;
  description: string;
  type: ButtonType;
  handleOnClick: () => void;
};
