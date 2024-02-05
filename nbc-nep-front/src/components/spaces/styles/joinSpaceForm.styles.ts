import styled from "styled-components";

export const StForm = styled.form`
  width: 100%;
`;
export const StContentsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[16]};

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    align-self: flex-start;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
  }
`;

export const StInputWrapper = styled.div<{ $isError: boolean }>`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[6]};
  gap: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[48]};
  input {
    width: 100%;
    flex-shrink: 1;
    border-radius: ${(props) => props.theme.border.radius[8]};
    padding: ${(props) => props.theme.spacing[12]};
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    ${(props) =>
      props.$isError && `border-color: ${props.theme.color.danger[500]}`};
    &:focus {
      outline: none;
      border: 1px solid
        ${(props) => props.theme.color.border.interactive.primary};
    }
  }
  & > button {
    height: ${(props) => props.theme.unit[48]};
    width: ${(props) => props.theme.unit[80]};
    padding: 0;
    font-size: ${(props) => props.theme.body.md.regular.fontSize};
  }
`;

export const StErrorMessage = styled.p`
  position: absolute;
  top: 4px;
  right: 0;
  color: ${(props) => props.theme.color.danger[500]};
`;
