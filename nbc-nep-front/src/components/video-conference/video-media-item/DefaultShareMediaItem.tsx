import styled from "styled-components";
import MetaAvatar from "../../metaverse/avatar/MetaAvatar";
import {
  StShareMediaItem,
  StShareMediaNickname,
} from "../styles/videoConference.styles";

interface Props {
  avatar?: string;
  nickname?: string;
}

export default function DefaultShareMediaItem({ nickname, avatar }: Props) {
  return (
    <StDefaultShareMediaItemWrapper>
      <MetaAvatar spaceAvatar={avatar} />
      <StShareMediaNickname>{nickname}</StShareMediaNickname>
    </StDefaultShareMediaItemWrapper>
  );
}

const StDefaultShareMediaItemWrapper = styled(StShareMediaItem)`
  display: flex;

  & > span {
    margin: auto;
  }

  position: relative;
`;
