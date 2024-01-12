import { ConsumerTransportType } from "../types/ScreenShare.types";

export function isAlreadyConsumeTransport(
  consumerTransports: ConsumerTransportType[],
  remoteProducerId: string
) {
  return consumerTransports.some((consumerTransport) => {
    return consumerTransport.producerId === remoteProducerId;
  });
}
