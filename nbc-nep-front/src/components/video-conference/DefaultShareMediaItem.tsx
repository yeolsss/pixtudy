import MetaAvatar from "../metaverse/avatar/MetaAvatar";

interface Props {
  avatar: string;
  nickname: string;
}

export default function DefaultShareMediaItem({ nickname, avatar }: Props) {
  return (
    <div>
      <MetaAvatar spaceAvatar={avatar} />
      <p>Default Image {nickname}</p>
    </div>
  );
}
