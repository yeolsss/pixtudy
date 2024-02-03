import { Socket, io } from "socket.io-client";
import createSelectors from "./createSelector";

import { create } from "zustand";

interface ConferenceSocketStoreProps {
  socket: Socket;
}

interface ConferenceSocketStoreState extends ConferenceSocketStoreProps {}

const useConferenceSocketStoreBase = create<ConferenceSocketStoreState>()(
  (set, get) => ({
    socket: io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/conference`, {
      withCredentials: true,
    }),
  })
);

const useConferenceSocketStore = createSelectors(useConferenceSocketStoreBase);

export default useConferenceSocketStore;
