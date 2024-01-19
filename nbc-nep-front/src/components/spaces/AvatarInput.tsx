import { useState } from "react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

function AvatarInput({ register, errors }: Props) {
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const options = Array.from({ length: 26 }, (_, i) => ({
    value: `NPC${i + 1}`,
    label: i + 1,
    src: `/assets/characters/presets/NPC${i + 1}.png`,
  }));

  type Inputs = {
    value: string;
  };

  return (
    <StInputContainer>
      {options.map((option, index) => (
        <StInputWrapper
          key={option.label}
          $isSelected={selectedAvatar === option.value}
        >
          <input
            type="radio"
            id={option.value}
            value={option.value}
            {...register("avatar", { required: "This field is required" })}
            onChange={() => setSelectedAvatar(option.value)}
          />
          <label htmlFor={option.value} key={option.label}>
            <StSpan resource={option.src}></StSpan>
          </label>
        </StInputWrapper>
      ))}
      {errors.avatar && <span>{errors.avatar.message as string}</span>}
    </StInputContainer>
  );
}

export default AvatarInput;

const StInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StInputWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.color.base.white};
  border-radius: ${(props) => props.theme.border.radius[8]};
  //prettier-ignore
  border-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.border.focusRing
      : props.theme.color.border.secondary};
  border-width: ${(props) => (props.$isSelected ? "2px" : "1px")};
  border-style: solid;
  input[type="radio"] {
    display: none;
  }
`;

const StSpan = styled.span`
  background-image: url(${(props) => props.resource});
  background-position: center;
  display: inline-block;
  width: 32px; /* 스프라이트의 너비 */
  height: 48px; /* 스프라이트의 높이 */
  background-repeat: no-repeat;
  background-position: 0px -14px; /* 첫 번째 스프라이트의 위치 */
  margin-right: 10px; /* 라벨 간 간격 조정 */
  cursor: pointer;
  margin: 0;
`;
