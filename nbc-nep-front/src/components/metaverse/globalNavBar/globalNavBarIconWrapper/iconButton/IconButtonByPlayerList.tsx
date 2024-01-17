import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import styled from "styled-components";
import Image from "next/image";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";

interface Props {
  button: IconButtonProperty;
}
export default function IconButtonByPlayerList({ button }: Props) {
  const { buttonImage, description, type, handleOnClick } = button;
  const { playerList } = usePlayerContext();
  return (
    <StIconButtonByPlayerListWrapper onClick={handleOnClick}>
      <Image src={buttonImage} alt={description} width={"16"} height={"16"} />
      <span>{playerList.length}</span>
    </StIconButtonByPlayerListWrapper>
  );
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
