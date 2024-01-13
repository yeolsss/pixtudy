import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useCustomQuery<T, TError extends Error = Error>(
  queryOptions: UseQueryOptions<T, TError>
): T | undefined {
  const [data, setData] = useState<T | undefined>(undefined);

  let {
    isLoading,
    isError,
    error,
    data: queryData,
  } = useQuery<T, TError>(queryOptions);

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {}, [isError, error]);

  return data;
}
