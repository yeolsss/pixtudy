import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useEffect } from "react";

export type TMutationOptions<T> = UseMutationOptions<
  unknown,
  Error,
  T,
  unknown
>;

export const useCustomMutation = <T>(mutationOptions: TMutationOptions<T>) => {
  const { isPending, isError, error, mutate } = useMutation<
    unknown,
    Error,
    T,
    unknown
  >(mutationOptions);

  useEffect(() => {}, [isPending]);

  useEffect(() => {
    if (isError) {
    }
  }, [isError, error]);

  return mutate;
};
