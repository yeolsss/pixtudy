import { characterOptions } from "@/components/spaces/constants/constants";
import { ChangeEvent } from "react";
import {
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import styled from "styled-components";

interface Props {
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
}

function AvatarInput({ register, errors, watch }: Props) {
  const { onChange, ...restParam } = register("avatar");

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <StInputContainer>
      {characterOptions.map((option) => (
        <StInputWrapper
          key={option.value}
          $isSelected={watch("avatar") === option.value}
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

export const StInputContainer = styled.div`
  position: relative;
  display: grid;
  gap: ${(props) => props.theme.spacing[12]};
  padding: ${(props) => props.theme.spacing[24]};
  max-height: ${(props) => props.theme.unit[220]};
  overflow: auto;
  border-radius: ${(props) => props.theme.border.radius[12]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  grid-template-columns: repeat(5, 1fr);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StInputWrapper = styled.div<{ $isSelected: boolean }>`
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
