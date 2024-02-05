import axios from "axios";

interface UserCount {
  count: number;
}

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
      : "http://localhost:3001",
  headers: {
    "cache-control": "no-cache",
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export const getUsersCount = async (spaceId: string) => {
  try {
    const response = await client.get(`/api/spaces/${spaceId}/users/count`);
    if (response.data && response.data.count !== undefined) {
      const { count } = response.data as UserCount;
      return count;
    }
    throw new Error("invalid response");
  } catch (error) {
    console.error(error);
  }
  return null;
};
