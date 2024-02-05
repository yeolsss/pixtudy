import { PlayerState } from "@/types/metaverse.types";

import { PLAYER_STATE_TEXT, PLAYER_STATE_VALUE } from "../constants";

export const getPlayerStateValue = (playerState: PlayerState) => {
  return PLAYER_STATE_VALUE[playerState];
};

export const getPlayerStateToText = (playerState?: PlayerState) => {
  if (!playerState) {
    return "온라인";
  }
  return PLAYER_STATE_TEXT[playerState];
};
