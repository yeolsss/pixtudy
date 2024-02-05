import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import Image from "next/image";
import styled from "styled-components";
import { IconButtonProperty } from "@/types/metaverse.types";

interface Props {
  button: IconButtonProperty;
}

const StIconButtonByPlayerListWrapper = styled.div`
  height: 47px;
  width: 44px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4"]};
  background-color: rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.radius["16"]};
  cursor: pointer;
  > span {
    display: inline-block;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    font-size: ${({ theme }) => theme.body.sm.regular.fontSize};
    font-family: NeoDunggeunmo;
    letter-spacing: -0.12px;
  }
`;

export default function IconButtonByPlayerList({ button }: Props) {
  const { buttonImage, description, handleOnClick } = button;
  const { playerList } = useMetaversePlayer();
  return (
    <StIconButtonByPlayerListWrapper onClick={handleOnClick}>
      <Image src={buttonImage} alt={description} width="16" height="16" />
      <span>{playerList.length}</span>
    </StIconButtonByPlayerListWrapper>
  );
}
