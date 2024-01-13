import {
  useGetCurrentSpaceUsers,
  useGetCurrentUser,
} from "@/hooks/query/useSupabase";
import { supabase } from "@/libs/supabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DMContainer from "./DmContainer";

export default function ConnectedUser() {
  // 현재 접속한 room의 접속 유저를 보여주는 components
  const router = useRouter();
  const space_id = router.query.index;
  const getCurrentUsers = useGetCurrentSpaceUsers();
  const getUser = useGetCurrentUser();
  const [currentUsers, setCurrentUsers] = useState<Space_members[]>([]);
  const [dmContainers, setDmContainers] = useState<string[]>([]);
  // 나에게 오는 메시지를 tracking하는 채널
  useEffect(() => {
    const dmChannel = supabase.channel(`dm_channel_${space_id}`);
    dmChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `receiver_id=eq.${getUser?.id}`,
        },
        (payload) => {
          setDmContainers((prev) => {
            if (prev.includes(payload.new.sender_id)) return prev;
            else return [payload.new.sender_id, ...prev];
          });
        }
      )
      .subscribe();
  }, []);

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
  }, [space_id]);

  const handleOpenDmContainer = (id: string) => {
    setDmContainers((prev) => {
      if (prev.includes(id)) return prev;
      else return [id, ...prev];
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
