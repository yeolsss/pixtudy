import styled from "styled-components";

interface Props {
  spaceAvatar?: string;
  width?: number;
  height?: number;
  y?: number;
  x?: number;
}
export default function MetaAvatar({
  spaceAvatar,
  width = 32,
  height = 32,
  x = -1,
  y = 40,
}: Props) {
  return (
    <StAvatar
      space_avatar={spaceAvatar}
      style={{ width, height, backgroundPosition: `${x}px ${y}px` }}
    ></StAvatar>
  );
}

const StAvatar = styled.span<{ space_avatar?: string }>`
  background-image: ${(props) =>
    `url("/assets/characters/presets/${props.space_avatar}.png")`};
  background-size: 512px 64px;
  background-position: -1px 40px;
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius.circle};
  display: block;
  background-color: white;
`;
