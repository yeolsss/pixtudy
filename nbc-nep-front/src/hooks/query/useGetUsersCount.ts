import { getUsersCount } from "@/api/gameServer/space";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsersCount(spaceId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["usersCount", spaceId],
    queryFn: () => getUsersCount(spaceId),
    staleTime: 20 * 1000,
  });
  if (error) {
    console.error(error);
  }
  return { data, isLoading };
}
