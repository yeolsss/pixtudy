import { pathValidation } from "@/utils/middlewareValidate";
import useAuth from "@/zustand/authStore";

import { useRouter } from "next/router";
import { useEffect } from "react";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const router = useRouter();

  const { user } = useAuth();

  const currentUserId = user.id;

  useEffect(() => {
    if (typeof router.query.message === "string" && !!router.query.message)
      pathValidation(router.query.message);
  }, [router.query]);

  return <SpaceList currentUserId={currentUserId} />;
}
