import { useAppDispatch } from "@/hooks/useReduxTK";
import { closeModal } from "@/redux/modules/modalSlice";
import styled from "styled-components";

export default function BackDrop() {
  const dispatch = useAppDispatch();

  const handleBackDropClose = () => {
    dispatch(closeModal());
  };

  return <StBackDrop onClick={handleBackDropClose} />;
}

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
