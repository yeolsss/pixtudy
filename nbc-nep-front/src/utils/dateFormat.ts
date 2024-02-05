import { ChatType } from "@/types/metaverse.types";

export const formatDate = (date: Date | string | undefined, type: ChatType) => {
  const newDate = typeof date === "string" ? new Date(date) : date;

  if (!newDate) return "";

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  switch (type) {
    case "GLOBAL":
      return `${hours}:${minutes}:${seconds}`;
    case "DM":
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    default:
      return "";
  }
};
