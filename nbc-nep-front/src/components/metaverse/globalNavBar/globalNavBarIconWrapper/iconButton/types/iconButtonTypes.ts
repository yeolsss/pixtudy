import { StaticImageData } from "next/image";

export type ButtonType =
  | "chat"
  | "settings"
  | "report"
  | "playerList"
  | "close";
export type IconButtonProperty = {
  buttonImage: StaticImageData;
  description: string;
  type: ButtonType;
  handleOnClick: () => void;
};
