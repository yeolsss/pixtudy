import styled from "styled-components";

interface Props {
  closeModal?: () => void;
}
export default function BackDrop({ closeModal }: Props) {
  return <StBackDrop onClick={closeModal && closeModal} />;
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
