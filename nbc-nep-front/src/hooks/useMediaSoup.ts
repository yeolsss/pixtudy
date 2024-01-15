import { Device, types } from "mediasoup-client";
import { useEffect, useState } from "react";
import useSocket from "./useSocket";

type Transport = types.Transport<types.AppData>;

export function useMediaSoup() {
  const [device, setDevice] = useState<Device | null>(null);
  const [transport, setTransport] = useState<Transport | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    const loadDevice = async () => {
      try {
        let device = new Device();
        await device.load({ routerRtpCapabilities });
        setDevice(device);
        socket.emit("requestTransport");
      } catch (error) {
        console.error("Could not load MediaSoup device:", error);
      }
    };

    socket.on("connect", loadDevice);
    socket.on("transportCreated", async (params) => {
      if (!device) return;
      const transport = device.createSendTransport(params);
      setTransport(transport);

      transport.on("connect", ({ dtlsParameters }, callback) => {
        socket.emit(
          "connectTransport",
          { transportId: transport.id, dtlsParameters },
          () => {
            callback();
          }
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Additional functions to handle producers/consumers

  return { device, transport };
}
