import styled from "styled-components";

export const StSearchInput = styled.input`
  width: 400px;
  height: ${(props) => props.theme.unit[48]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid #d9d9d9;
  padding: ${(props) => props.theme.spacing[16]};
  outline: none;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.border.focusRing};
  }
`;
