import { types } from "mediasoup-client";

export type RtpCapabilities = types.RtpCapabilities;

export type DtlsParameters = {
  dtlsParameters: types.DtlsParameters;
};

export type ProduceParameter = {
  kind: types.MediaKind;
  rtpParameters: types.RtpParameters;
  appData: types.AppData;
};

export type TransPortType = {
  id: string;
  iceParameters: types.IceParameters;
  iceCandidates: types.IceCandidate[];
  dtlsParameters: types.DtlsParameters;
};

export type ConsumerTransportType = {
  consumerTransport: types.Transport;
  serverConsumerTransportId: string;
  producerId: string;
  consumer: types.Consumer;
};

export type NewProducerParameter = {
  producerId: string;
  socketId: string;
  socketName: string;
  isNewSocketHost: boolean;
};

export type ShareType = "screen" | "webcam";
