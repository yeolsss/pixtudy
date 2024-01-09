import styled from "styled-components";

export default function BackDrop({
  toggleLoginModal,
}: {
  toggleLoginModal: () => void;
}) {
  return <StBackDrop onClick={toggleLoginModal}></StBackDrop>;
}

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;