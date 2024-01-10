import Layout from "@/components/layout/Layout";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Space_members } from "@/types/supabase.tables.type";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const [userSpaces, setUserSpaces] = useState<Space_members[] | null>();

  const getUserSpaces = useGetUserSpaces();

  useEffect(() => {
    getUserSpaces(undefined, {
      onSuccess: (response) => {
        setUserSpaces(response);
      },
    });
  }, []);

  return (
    <div>
      {userSpaces?.map((space) => (
        <section key={space.id}>
          <h1>{space.spaces?.title}</h1>
          <h2>{space.spaces?.description}</h2>
          <span>{space.spaces?.created_at}</span>
        </section>
      ))}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
