import { useAppSelector } from "@/hooks/useReduxTK";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalPortal from "./modal/ModalPortal";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";

export default function Spaces() {
  const currentUserId = useAppSelector((state) => state.authSlice.user.id);
  const isModalOpen = useAppSelector(
    (state) => state.modalSlice.isJoinSpaceModalOpen
  );
  const getUserSpaces = useGetUserSpaces(currentUserId);

  const [userSpaces, setUserSpaces] = useState<Space_members[]>([]);

  useEffect(() => {
    if (getUserSpaces) setUserSpaces(getUserSpaces);
  }, [getUserSpaces]);

  const router = useRouter();

  const handleToSpace = async (space_id: string) => {
    await router.push(`/metaverse/${space_id}`);
  };
  return (
    <>
      <button>Space에 입장하기</button>
      {userSpaces?.map((space) => {
        return (
          <section key={space.id}>
            <h1>{space.spaces?.title}</h1>
            <h2>{space.spaces?.description}</h2>
            <span>{space.spaces?.created_at}</span>
            <button onClick={() => handleToSpace(space.spaces?.id!)}>
              space로 이동
            </button>
          </section>
        );
      })}
      <ModalPortal></ModalPortal>
    </>
  );
}
