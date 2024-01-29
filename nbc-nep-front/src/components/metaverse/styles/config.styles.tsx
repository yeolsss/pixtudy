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
