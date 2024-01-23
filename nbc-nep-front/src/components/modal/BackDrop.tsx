import { useAppDispatch } from "@/hooks/useReduxTK";
import styled from "styled-components";

export default function BackDrop() {
  const dispatch = useAppDispatch();

  /**
   * 이거 없애면 안될까?
   */
  // const handleBackDropClose = () => {
  //   dispatch(closeModal());
  // };

  return <StBackDrop />;
}

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;
