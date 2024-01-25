import { characterOptions } from "@/components/spaces/constants/constants";
import useSpace from "@/zustand/spaceStore";
import { ChangeEvent, useState } from "react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

function AvatarInput({ register, errors }: Props) {
  const {
    userProfile: { avatar },
  } = useSpace();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  const { onChange, ...restParam } = register("avatar");

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatar(e.target.value);
    onChange(e);
  };

  return (
    <StInputContainer>
      {characterOptions.map((option, index) => (
        <StInputWrapper
          key={option.value}
          $isSelected={selectedAvatar === option.value}
        >
          <input
            type="radio"
            id={option.value}
            value={option.value}
            onChange={handleCustomChange}
            {...restParam}
          />
          <label htmlFor={option.value} key={option.label}>
            <StAvatar resource={option.src}></StAvatar>
          </label>
        </StInputWrapper>
      ))}
      {errors.avatar && <span>{errors.avatar.message as string}</span>}
    </StInputContainer>
  );
}

export default AvatarInput;

const StInputContainer = styled.div`
  background-color: ${(props) => props.theme.color.bg.secondary};
  padding: ${(props) => props.theme.spacing[24]};

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: ${(props) => props.theme.spacing[12]};
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

export const StAvatar = styled.span`
  background-image: url(${(props) => props.resource});
  background-position: center;
  display: inline-block;
  width: 32px;
  height: 48px;
  background-repeat: no-repeat;
  background-position: 0px -14px;
  margin-right: 10px;
  cursor: pointer;
  margin: 0;
`;
