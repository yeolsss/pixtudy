import { useGetCurrentSpaceUsers } from "@/hooks/query/useSupabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ConnectedUser() {
  // 현재 접속한 room의 접속 유저를 보여주는 components
  const router = useRouter();
  const space_id = router.query.index;
  const getCurrentUsers = useGetCurrentSpaceUsers();
  const [currentUsers, setCurrentUsers] = useState<Space_members[]>([]);

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
  return (
    <ul>
      {currentUsers?.map((user) => {
        return (
          <li key={user.id}>
            <h3>{user.users?.display_name}</h3>
            <span>{user.user_id}</span>
            <button>dm start</button>
          </li>
        );
      })}
    </ul>
  );
}
