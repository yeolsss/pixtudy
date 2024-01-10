import Layout from "@/components/layout/Layout";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const [userSpaces, setUserSpaces] = useState<Space_members[] | null>();

  const getUserSpaces = useGetUserSpaces();
  const router = useRouter();

  useEffect(() => {
    getUserSpaces(undefined, {
      onSuccess: (response) => {
        setUserSpaces(response);
      },
    });
  }, []);

  const handleToSpace = () => {
    router.push("/chat");
  };
  return (
    <div>
      {userSpaces?.map((space) => (
        <section key={space.id}>
          <h1>{space.spaces?.title}</h1>
          <h2>{space.spaces?.description}</h2>
          <span>{space.spaces?.created_at}</span>
          <button onClick={handleToSpace}>space로 이동</button>
        </section>
      ))}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
