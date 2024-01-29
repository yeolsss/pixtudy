import { Config } from "../types/config.types";

export const configModes: {
  mode: Config;
  name: string;
}[] = [
  { mode: "SPACE_CONFIG", name: "스페이스 설정" },
  { mode: "VIDEO_CONFIG", name: "비디오/오디오 설정" },
  { mode: "CHAT_CONFIG", name: "채팅 설정" },
];

export const SPACE_CONFIG = "SPACE_CONFIG";
export const VIDEO_CONFIG = "VIDEO_CONFIG";
export const CHAT_CONFIG = "CHAT_CONFIG";

export const SPACE_NAME_FORM = "SPACE_NAME";
export const SPACE_DESCRIPTION_FORM = "SPACE_DESCRIPTION";
export const SPACE_THUMB_FORM = "SPACE_THUMB";
