import styled from "styled-components";

const BackDrop = () => {
  return <StBackDrop></StBackDrop>;
};

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
export default BackDrop;
