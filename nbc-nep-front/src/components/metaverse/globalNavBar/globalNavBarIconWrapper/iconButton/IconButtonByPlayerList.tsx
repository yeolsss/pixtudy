import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import styled from "styled-components";

interface Props {
  button: IconButtonProperty;
}
export default function IconButtonByPlayerList({ button }: Props) {
  return <StIconButtonByPlayerListWrapper></StIconButtonByPlayerListWrapper>;
}

const StIconButtonByPlayerListWrapper = styled.button`
  height: 47px;
  width: 44px;
  background-color: rgba(0, 0, 0, 0.1);
`;
