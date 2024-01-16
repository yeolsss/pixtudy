import styled from "styled-components";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";

interface Props {
  button: IconButtonProperty;
}
export default function IconButtonWrapper({ button }: Props) {
  const { buttonImage, description, handleOnClick } = button;
  return (
    <StIconButtonWrapper>
      <IconButton
        buttonImage={buttonImage}
        description={description}
        handleOnClick={handleOnClick}
      />
      <span>{description}</span>
    </StIconButtonWrapper>
  );
}

const StIconButtonWrapper = styled.div`
  width: 50px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  > span {
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
`;
