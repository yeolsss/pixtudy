import styled from "styled-components";

export const StProfilePreview = styled.div`
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  padding: ${(props) => props.theme.spacing[12]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
  align-items: center;
  width: 100%;
`;
