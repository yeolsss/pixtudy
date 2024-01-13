import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useCustomQuery<T, TError extends Error = Error>(
  queryOptions: UseQueryOptions<T, TError>
): T | undefined {
  let { isLoading, isError, error, data, refetch } = useQuery<T, TError>(
    queryOptions
  );

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {}, [isError, error]);

  return data;
}
