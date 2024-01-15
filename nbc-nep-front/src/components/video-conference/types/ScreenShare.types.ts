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

export type TransPortParams = {
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

export type MediaStreamWithId = {
  stream: MediaStream;
  id: string;
};

export type TrackKind = "video" | "audio";
