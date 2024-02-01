import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import styled from "styled-components";

interface Props {
  button: IconButtonProperty;
}
export default function IconButtonWrapper({ button }: Props) {
  const { buttonImage, description, type, handleOnClick } = button;

  return (
    <StIconButtonWrapper>
      <IconButton
        buttonImage={buttonImage}
        description={description}
        type={type}
        handleOnClick={handleOnClick}
      />
    </StIconButtonWrapper>
  );
}

const StIconButtonWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & + div {
    margin-top: 20px;
  }

  > span {
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
`;
