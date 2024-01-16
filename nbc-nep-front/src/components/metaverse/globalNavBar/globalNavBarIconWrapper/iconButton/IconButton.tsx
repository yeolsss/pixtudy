import Image from "next/image";
import styled from "styled-components";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";

export default function IconButton({
  buttonImage,
  description,
  handleOnClick,
}: IconButtonProperty) {
  return (
    <StButton onClick={handleOnClick}>
      <Image src={buttonImage} alt={description} width={"50"} height={"50"} />
    </StButton>
  );
}

const StButton = styled.button`
  background-color: unset;
  border: unset;
  padding: unset;
  cursor: pointer;
`;
