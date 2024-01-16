import { Player } from "@/types/metaverse";
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

export type NewProducerParameter = {
  producerId: string;
  socketId: string;
  socketName: string;
  isNewSocketHost: boolean;
};

export type AppData = {
  trackId: string;
  streamId: string;
  playerId: string;
  shareType: ShareType;
} & types.AppData;

export type ShareType = "screen" | "webcam" | "audio";

export type SendTransportType = types.Transport<types.AppData>;

export type RecvTransportType = types.Transport<types.AppData>;

export type Producer = types.Producer<AppData>;

export type Consumer = types.Consumer<AppData>;

export type VideoSource = Producer | Consumer;

export type MediaStreamWithId = {
  stream: MediaStream;
  id: string;
};

export type TrackKind = "video" | "audio";

export type ProducerForConsume = { id: string; appData: AppData };

export type UserWithVideoSource = {
  producers: Producer[];
  consumers: Consumer[];
} & Player;

export type UserVideoSourceMap = {
  [key: string]: UserWithVideoSource;
};

export type SplitVideoSource = [VideoSource[], VideoSource[]];
