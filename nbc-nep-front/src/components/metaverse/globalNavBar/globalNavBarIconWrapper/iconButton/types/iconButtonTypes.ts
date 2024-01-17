import { StaticImageData } from "next/image";

export type ButtonType = "chat" | "settings" | "report" | "playerList";
export type IconButtonProperty = {
  buttonImage: StaticImageData;
  description: string;
  type: ButtonType;
  handleOnClick: () => void;
};
