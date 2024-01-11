import { useGetCurrentSpaceUsers } from "@/hooks/query/useSupabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DMContainer from "./DmContainer";

export default function ConnectedUser() {
  // 현재 접속한 room의 접속 유저를 보여주는 components
  const router = useRouter();
  const space_id = router.query.index;
  const getCurrentUsers = useGetCurrentSpaceUsers();
  const [currentUsers, setCurrentUsers] = useState<Space_members[]>([]);
  const [dmContainers, setDmContainers] = useState<string[]>([]);

  useEffect(() => {
    if (typeof space_id === "string") {
      getCurrentUsers(
        { space_id },
        {
          onSuccess: (currentUsers) => {
            setCurrentUsers(currentUsers || []);
          },
        }
      );
    }
  }, []);

  const handleOpenDmContainer = (id: string) => {
    setDmContainers((prev) => {
      if (prev.includes(id)) return prev;
      else return [...prev, id];
    });
  };

  const handleCloseDmContainer = (user_id: string) => {
    setDmContainers((prev) => prev.filter((id) => id !== user_id));
  };
  return (
    <>
      {/* 유저정보 */}
      <ul>
        {currentUsers?.map((user) => {
          return (
            <li key={user.id}>
              <h3>{user.users?.display_name}</h3>
              <span>{user.users?.email}</span>
              <button onClick={() => handleOpenDmContainer(user.users?.id!)}>
                dm start
              </button>
            </li>
          );
        })}
      </ul>
      {/* 각 채팅방 */}
      <section>
        {dmContainers.map((dmContainer) => (
          <DMContainer
            key={dmContainer}
            otherUserId={dmContainer}
            handleCloseDmContainer={handleCloseDmContainer}
          />
        ))}
      </section>
    </>
  );
}
