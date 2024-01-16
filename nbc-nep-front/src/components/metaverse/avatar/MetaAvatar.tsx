import styled from "styled-components";

interface Props {
  spaceAvatar: string;
}
export default function MetaAvatar({ spaceAvatar }: Props) {
  return <StAvatar space_avatar={spaceAvatar}></StAvatar>;
}

const StAvatar = styled.span<{ space_avatar: string }>`
  background-image: ${(props) =>
    `url("/assets/characters/presets/${props.space_avatar}.png")`};
  background-size: 512px 64px;
  background-position: -1px 40px;
  width: 32px;
  height: 32px;
  border: 1px solid black;
  border-radius: 50%;
  display: block;
  background-color: white;
`;
