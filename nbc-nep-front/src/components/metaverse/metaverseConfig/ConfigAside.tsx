import styledComponents from "styled-components";

import { Config } from "@/types/metaverse.types";

import { configModes } from "../constants/config.constant";

const styled = styledComponents;

const StAside = styled.aside`
  grid-area: "aside";
  nav {
    height: 100%;
  }
  background-color: ${(props) => props.theme.color.bg.secondary};

  padding: ${(props) => props.theme.spacing[16]} !important;
`;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
`;

const StLi = styled.li<{ $isSelected: boolean }>`
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

interface Props {
  currentConfigMode: Config;
  handleSelectConfigMode: (configMode: Config) => void;
}

export default function ConfigAside({
  currentConfigMode,
  handleSelectConfigMode,
}: Props) {
  return (
    <StAside>
      <nav>
        <StUl>
          {configModes.map(({ mode, name }) => (
            <StLi
              key={mode}
              $isSelected={mode === currentConfigMode}
              onClick={() => handleSelectConfigMode(mode)}
            >
              {name}
            </StLi>
          ))}
        </StUl>
      </nav>
    </StAside>
  );
}
