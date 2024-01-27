import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useAuth from "@/zustand/authStore";
import { StCardListWrapper } from "../spaces/SpaceList";
import ScrumBoardCard from "./ScrumBoardCard";

export default function ScrumBoardList() {
  const { user } = useAuth();
  const userSpaces = useGetUserSpaces(user.id);
  return (
    <StCardListWrapper>
      <ul>
        <li>
          {userSpaces?.map((space) => (
            <ScrumBoardCard key={space.id} space={space} />
          ))}
        </li>
      </ul>
    </StCardListWrapper>
  );
}
