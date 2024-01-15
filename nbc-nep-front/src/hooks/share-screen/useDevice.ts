import {
  RtpCapabilities,
  TransPortParams,
} from "@/components/share-screen/types/ScreenShare.types";
import { Device } from "mediasoup-client";
import { useCallback, useEffect, useRef } from "react";
export default function useDevice() {
  const deviceRef = useRef<Device>();

  useEffect(() => {
    if (deviceRef.current) return;
    deviceRef.current = new Device();
  }, []);

  async function loadDevice(rtpCapabilities: RtpCapabilities) {
    const device = deviceRef.current;
    if (device && device.loaded) return;
    try {
      await device?.load({ routerRtpCapabilities: rtpCapabilities });
    } catch (error) {
      console.error("load device error", error);
    }
  }

  const createSendTransportWithDevice = useCallback(
    (params: TransPortParams) => {
      return deviceRef.current!.createSendTransport(params);
    },
    [deviceRef.current]
  );

  const createRecvTransportWithDevice = useCallback(
    (params: TransPortParams) => {
      return deviceRef.current!.createRecvTransport(params);
    },
    [deviceRef.current]
  );

  function getRtpCapabilitiesFromDevice() {
    return deviceRef.current!.rtpCapabilities;
  }

  return {
    device: deviceRef.current!,
    loadDevice,
    createSendTransportWithDevice,
    createRecvTransportWithDevice,
    getRtpCapabilitiesFromDevice,
  };
}
