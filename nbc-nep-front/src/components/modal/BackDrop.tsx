import { closeModal } from "@/redux/modules/modalSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function BackDrop() {
  const dispatch = useDispatch<AppDispatch>();

  const HandleBackDropClose = () => {
    dispatch(closeModal());
  };

  return <StBackDrop onClick={HandleBackDropClose} />;
}

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
