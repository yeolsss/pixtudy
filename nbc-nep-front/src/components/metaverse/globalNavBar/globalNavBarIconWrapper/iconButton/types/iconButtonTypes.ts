import { StaticImageData } from "next/image";

export type IconButtonProperty = {
  buttonImage: StaticImageData;
  description: string;
  handleOnClick: () => void;
};
