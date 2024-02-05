import styled from "styled-components";
import { StDangerButton } from "@/components/common/button/button.styles";

export const StHiddenInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const StSectionMain = styled.section`
  grid-area: main;

  &,
  div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }

  div:not(:last-child) {
    padding-bottom: 1rem;
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.color.bg.secondary};
  }

  div span,
  div h1,
  div p {
    font-family: var(--default-font);
  }
  div span {
    font-weight: 700;
    font-size: 1.5rem;
  }
  div h1,
  div p {
    font-size: 1.25rem;
  }
  div img {
    align-self: center;
  }
`;

export const StSectionChatConfig = styled.section`
  grid-area: main;

  &,
  & > div {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }

  & > h1 {
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.color.bg.secondary};
    font-size: 1.5rem;
  }

  h2,
  h1 {
    font-weight: 700;
    font-family: var(--default-font);
  }

  & > div > div {
    display: flex;
    align-items: center;
    & > select {
      width: ${(props) => props.theme.unit["112"]};
      height: ${(props) => props.theme.unit["24"]};
    }

    input[type="range"] {
      width: 100%;
      background: transparent;
      border: none;
      padding: 0;
      height: fit-content;
    }
    input[type="number"] {
      text-align: center;
      width: auto;
      height: ${(props) => props.theme.unit["40"]};
      outline: none;
      padding: 0;
      /* border: none; */
      font-size: ${(props) => props.theme.unit["16"]};
      margin-left: ${(props) => props.theme.spacing["12"]};
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  & > div + div {
    padding-top: 3rem;
    border-top: 1px solid ${(props) => props.theme.color.bg.secondary};
  }
  & button {
    width: ${(props) => props.theme.unit["112"]};
    margin-top: ${(props) => props.theme.spacing["40"]};
  }

  h2 {
    font-size: 1.25rem;
  }
`;

export const StAside = styled.aside`
  grid-template-areas: "aside";
  nav {
    height: 100%;
  }
  background-color: ${(props) => props.theme.color.bg.secondary};

  padding: ${(props) => props.theme.spacing[16]} !important;
`;

export const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
`;

export const StLi = styled.li<{ $isSelected: boolean }>`
  padding: ${(props) => props.theme.spacing[6]};
  cursor: pointer;

  ${(props) =>
    props.$isSelected &&
    `background-color: ${props.theme.color.bg["info-subtle"]}`};
  ${(props) => props.$isSelected && `color: ${props.theme.color.bg.brand}`};

  font-family: var(--default-font);
  border-radius: ${(props) => props.theme.border.radius[8]};
  font-size: 1.125rem;
`;

export const StHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  span:last-child {
    font-size: 1.125rem;
    font-weight: normal;
  }
`;

export const StErrorText = styled.span`
  font-size: 1.125rem !important;
  font-weight: normal !important;
  color: ${(props) => props.theme.color.danger[500]};
  font-family: var(--default-font);
`;

export const StSection = styled(StSectionMain)`
  overflow: auto;

  div label {
    align-self: center;
    cursor: pointer;
  }

  input,
  textarea {
    font-family: var(--default-font);
  }
  padding-top: 0 !important;
`;

export const StDanger = styled(StDangerButton)`
  padding: ${(props) => `${props.theme.spacing[8]} ${props.theme.spacing[16]}`};
  font-size: inherit;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

export const StHelperSpan = styled.p`
  font-size: 0.75rem;
  font-weight: normal;
  color: ${(props) => props.theme.color.text.info};
  text-align: center;
  opacity: 0.5;
`;

export const StFloatingLoading = styled.div`
  position: absolute;

  right: ${(props) => props.theme.spacing[24]};
  top: ${(props) => props.theme.spacing[64]};
`;

export const StForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${(props) => props.theme.spacing[8]};

  button {
    align-self: flex-end;
  }
`;
