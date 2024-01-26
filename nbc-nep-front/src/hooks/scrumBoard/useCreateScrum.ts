import { useState } from "react";

interface ReturnType {
  isCreateBackDropOpen: boolean;
  handleToggleCreate: (createBackDropStatus: boolean) => void;
}

export default function useCreateScrum(): ReturnType {
  const [isCreateBackDropOpen, setIsCreateBackDropOpen] =
    useState<boolean>(false);

  const handleToggleCreate = (createBackDropStatus: boolean) => {
    // setIsCreateBackDropOpen(createBackDropStatus);
    setIsCreateBackDropOpen((prev) => !prev);
  };

  return { isCreateBackDropOpen, handleToggleCreate };
}
