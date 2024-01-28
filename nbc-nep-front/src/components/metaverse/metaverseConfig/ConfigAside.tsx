import styled from "styled-components";
import { configModes } from "../constants/config.contant";
import { Config } from "../types/config.types";

interface Props {
  currentConfigMode: Config;
  handleSelectConfigMode: (configMode: Config) => void;
}

export default function ConfigAside({
  currentConfigMode,
  handleSelectConfigMode,
}: Props) {
  return (
    <aside>
      <nav>
        <ul>
          {configModes.map(({ mode, name }) => (
            <StLi
              key={mode}
              $isSelected={mode === currentConfigMode}
              onClick={() => handleSelectConfigMode(mode)}
            >
              {name}
            </StLi>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const StLi = styled.li<{ $isSelected: boolean }>`
  ${(props) =>
    props.$isSelected &&
    `border: 1px solid ${props.theme.color.border.interactive["secondary-pressed"]}`};
`;
