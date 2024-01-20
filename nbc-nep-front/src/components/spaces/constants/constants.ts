import { FormCharacter, FormSpace } from "../types/space.types";

export const FORM_SPACE: FormSpace = "formSpace";
export const FORM_CHARACTER: FormCharacter = "formCharacter";

export const characterOptions = Array.from({ length: 26 }, (_, i) => ({
  value: `NPC${i + 1}`,
  label: i + 1,
  src: `/assets/characters/presets/NPC${i + 1}.png`,
}));
