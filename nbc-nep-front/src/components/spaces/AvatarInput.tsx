import { ChangeEvent, useState } from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import styled from "styled-components";
import { characterOptions } from "./constatns/constants";

interface Props {
  register: UseFormRegister<FieldValues>;
}

function AvatarInput({ register }: Props) {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const {
    formState: { errors },
  } = useForm();

  const { onChange, ...restParam } = register("avatar", {
    required: "This field is required",
  });

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
