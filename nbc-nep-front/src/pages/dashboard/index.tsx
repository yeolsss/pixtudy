import Layout from "@/components/layout/Layout";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const currentUserId = useAppSelector((state) => state.authSlice.user.id);
  const getUserSpaces = useGetUserSpaces(currentUserId);
  const [userSpaces, setUserSpaces] = useState<Space_members[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (getUserSpaces) setUserSpaces(getUserSpaces);
  }, [getUserSpaces]);

  const handleToSpace = (space_id: string) => {
    router.push(`/dm/${space_id}`);
  };
  return (
    <div>
      {userSpaces?.map((space) => (
        <section key={space.id}>
          <h1>{space.spaces?.title}</h1>
          <h2>{space.spaces?.description}</h2>
          <span>{space.spaces?.created_at}</span>
          <button onClick={() => handleToSpace(space.spaces?.id!)}>
            space로 이동
          </button>
        </section>
      ))}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
