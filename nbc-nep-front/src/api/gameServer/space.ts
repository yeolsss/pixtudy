import axios from "axios";

interface UserCount {
  count: number;
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
  headers: {
    "cache-control": "no-cache",
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export const getUsersCount = async (spaceId: string) => {
  try {
    const response = await client.get(`/api/spaces/${spaceId}/users/count`);
    const { count } = response.data as UserCount;
    return count;
  } catch (error) {
    console.error(error);
  }
};
