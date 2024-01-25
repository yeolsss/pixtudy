import useAuth from "@/zustand/authStore";
import SpaceList from "./SpaceList";

export default function Spaces() {
  const { user } = useAuth();
  const currentUserId = user.id;

  return <SpaceList currentUserId={currentUserId} />;
}
