import { RtpCapabilities } from "@/components/share-screen/types/ScreenShare.types";
import { Device, types } from "mediasoup-client";
import { useEffect, useRef } from "react";
export default function useDevice() {
  const deviceRef = useRef<types.Device>();

  useEffect(() => {
    if (deviceRef.current) return;
    deviceRef.current = new Device();
  }, []);

  async function loadDevice(rtpCapabilities: RtpCapabilities) {
    const device = deviceRef.current;
    try {
      await device?.load({ routerRtpCapabilities: rtpCapabilities });
    } catch (error) {
      console.error("load device error", error);
    }
  }

  return {
    device: deviceRef.current,
    loadDevice,
  };
}
