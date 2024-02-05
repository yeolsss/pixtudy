import { Config } from "@/types/metaverse.types";

import {
  StAside,
  StLi,
  StUl,
} from "@/components/metaverse/styles/config.styles";
import { configModes } from "../constants/config.constant";

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
