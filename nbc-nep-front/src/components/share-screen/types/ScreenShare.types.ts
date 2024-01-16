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
// ! 이번것이 해결된다면 사라져야 마땅함.
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

export type ShareType = "screen" | "webcam" | "audio";

export type SendTransportType = types.Transport<types.AppData>;

export type RecvTransportType = types.Transport<types.AppData>;

export type Producer = types.Producer<types.AppData>;

export type Consumer = types.Consumer<types.AppData>;

// 가이드 형태
export type GuideStatusType =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom"
  | "center";

// 그리드 형태
export type GridStatusType =
  | "center-one"
  | "topBottom-two"
  | "leftRight-two"
  | "edge-four";
