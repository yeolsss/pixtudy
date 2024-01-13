import { useGetCurrentSpaceUsers } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { supabase } from "@/libs/supabase";
import { Tables } from "@/types/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DMContainer from "./DmContainer";

export default function ConnectedUser() {
  // params의 접속 스페이스 id 가져오기
  const router = useRouter();

  const spaceId =
    typeof router.query.space_id === "string" ? router.query.space_id : "";

  const currentUserId = useAppSelector((state) => state.authSlice.user.id);

  const getCurrentUsers = useGetCurrentSpaceUsers(spaceId);

  const [activateDmUsers, setActivateDmUsers] = useState<string[]>([]);

  const getNewMessage = (
    payload: RealtimePostgresInsertPayload<Tables<"dm_messages">>
  ) => {
    setActivateDmUsers((prev) => {
      if (prev.includes(payload.new.sender_id)) return prev;
      else return [payload.new.sender_id, ...prev];
    });
  };

  const handleOpenDmContainer = (id: string) => {
    setActivateDmUsers((prev) => {
      if (prev.includes(id)) return prev;
      else return [id, ...prev];
    });
  };

  const handleCloseDmContainer = (user_id: string) => {
    setActivateDmUsers((prev) => prev.filter((id) => id !== user_id));
  };

  // 나에게 오는 메시지를 tracking하는 채널
  useEffect(() => {
    const dmChannel = supabase.channel(`dm_channel_${spaceId}`);
    dmChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dm_messages",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        getNewMessage
      )
      .subscribe();
  }, []);

  return (
    <>
      {/* 유저정보 */}
      <ul>
        {getCurrentUsers?.map((user) => {
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
        {activateDmUsers.map((user) => (
          <DMContainer
            key={user}
            otherUserId={user}
            handleCloseDmContainer={handleCloseDmContainer}
            spaceId={spaceId}
          />
        ))}
      </section>
    </>
  );
}
