import {
  RtpCapabilities,
  TransPortType,
} from "@/components/share-screen/types/ScreenShare.types";
import { Device } from "mediasoup-client";
import { useEffect, useRef } from "react";
export default function useDevice() {
  const deviceRef = useRef<Device>();

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

  function createSendTransportWithDevice(params: TransPortType) {
    return deviceRef.current!.createSendTransport(params);
  }

  function createRecvTransportWithDevice(params: TransPortType) {
    return deviceRef.current!.createRecvTransport(params);
  }

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
