import useAuth from "@/zustand/authStore";
import SpaceList from "./SpaceList";

interface Props {
  setRunState: (isRun: boolean) => void;
  showTemporaryComponent: boolean;
}

export default function Spaces({ setRunState, showTemporaryComponent }: Props) {
  const { user } = useAuth();
  const currentUserId = user.id;

  return (
    <SpaceList
      currentUserId={currentUserId}
      setRunState={setRunState}
      showTemporaryComponent={showTemporaryComponent}
    />
  );
}
