import { FormCharacter, FormSpace } from "../types/space.types";

export const FORM_SPACE: FormSpace = "formSpace";
export const FORM_CHARACTER: FormCharacter = "formCharacter";

export const characterOptions = Array.from({ length: 26 }, (_, i) => ({
  value: `NPC${i + 1}`,
  label: i + 1,
  src: `/assets/characters/presets/NPC${i + 1}.png`,
}));

export const SRC_BASE = "/assets/characters/presets/";

export const fieldValues = [
  {
    name: "spaceName",
    type: "text",
    placeholder: "스페이스의 이름을 입력해주세요.",
    register: {
      required: "스페이스를 생성하려면 이름이 필요합니다.",
      minLength: {
        value: 2,
        message: "스페이스의 이름은 2글자 이상이어야 합니다.",
      },
      maxLength: {
        value: 20,
        message: "스페이스의 이름은 20글자 이내여야 합니다.",
      },
    },
    maxLength: 20,
  },
  {
    name: "spaceDescription",
    type: "textarea",
    placeholder: "스페이스를 설명해주세요.",
    register: {
      required: "스페이스를 생성하려면 설명이 필요합니다.",
      maxLength: {
        value: 100,
        message: "스페이스의 설명은 100글자 이내여야 합니다.",
      },
    },
    maxLength: 100,
  },
];
