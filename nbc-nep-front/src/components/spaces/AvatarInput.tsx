import { characterOptions } from "@/components/spaces/constants/constants";
import { ChangeEvent } from "react";
import {
  FieldValues,
  FormState,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import {
  StAvatar,
  StInputContainer,
  StInputWrapper,
} from "./styles/profileForm.styles";

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
          <label htmlFor={option.value}>
            <StAvatar resource={option.src} />
            <input
              type="radio"
              id={option.value}
              value={option.value}
              onChange={handleCustomChange}
              {...restParam}
            />
          </label>
        </StInputWrapper>
      ))}
      {errors.avatar && <span>{errors.avatar.message as string}</span>}
    </StInputContainer>
  );
}

export default AvatarInput;
