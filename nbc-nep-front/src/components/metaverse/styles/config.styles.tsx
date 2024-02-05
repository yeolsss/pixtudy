import styled from "styled-components";

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
