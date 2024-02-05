import { io, Socket } from "socket.io-client";

import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface ConferenceSocketStoreProps {
  socket: Socket;
}

interface ConferenceSocketStoreState extends ConferenceSocketStoreProps {}

const useConferenceSocketStoreBase = create<ConferenceSocketStoreState>()(
  () => ({
    socket: io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/conference`, {
      withCredentials: true,
    }),
  })
);

const useConferenceSocketStore = createSelectors(useConferenceSocketStoreBase);

export default useConferenceSocketStore;
