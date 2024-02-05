import { PropsWithChildren } from "react";

import MetaAvatar from "../../metaverse/avatar/MetaAvatar";
import { StShareMediaNickname } from "../styles/videoConference.styles";
import { StDefaultShareMediaItemWrapper } from "../styles/videoMedia.styles";

interface Props {
  avatar?: string;
  nickname?: string;
}

export default function DefaultShareMediaItem({
  nickname,
  avatar,
  children,
}: PropsWithChildren<Props>) {
  return (
    <StDefaultShareMediaItemWrapper $isAudio={false}>
      <MetaAvatar spaceAvatar={avatar} />
      <StShareMediaNickname>{nickname}</StShareMediaNickname>
      {children}
    </StDefaultShareMediaItemWrapper>
  );
}

DefaultShareMediaItem.defaultProps = {
  nickname: "",
  avatar: "NPC1",
};
