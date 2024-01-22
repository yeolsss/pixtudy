import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Redirect() {
  // prefetching을 안하는 페이지
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
}
