import styled from "styled-components";

export const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2400;
  background: white;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  width: ${(props) => props.theme.unit[460]};
  padding: ${(props) => props.theme.spacing[32]};
  padding-top: 0;
  height: 100%;
`;
