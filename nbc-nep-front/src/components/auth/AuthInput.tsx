import { blind, info, unblind } from "@/assets/auth";
import Image from "next/image";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import styled from "styled-components";

interface Props {
  placeholder: string;
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  validate: (value: string, watchValue?: string) => boolean | string;
}

export default function AuthInput({
  placeholder,
  id,
  type,
  register,
  error,
  watch,
  validate,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <StAuthInputSection $isError={!!error[id]?.message}>
      <div>
        <input
          id={id}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          {...register(id, {
            required: true,
            validate: (value) =>
              validate(
                value,
                id === "signUp_check_pw" ? watch("signUp_pw") : null
              ),
          })}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            <Image src={isPasswordVisible ? unblind : blind} alt="" />
          </button>
        )}
      </div>

      {error[id]?.message && (
        <span>
          <Image src={info} alt="" />
          {error[id]?.message as string}
        </span>
      )}
    </StAuthInputSection>
  );
}

const StAuthInputSection = styled.div<{ $isError: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    position: relative;

    & input {
      width: 100%;
      height: ${(props) => props.theme.unit["48"]}px;
      font-size: ${(props) => props.theme.unit["14"]}px;
      font-family: inherit;
      outline-color: ${(props) =>
        props.$isError
          ? props.theme.color.danger[400]
          : props.theme.color.base.black};
    }

    & button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      padding: unset;
      border-radius: unset;
      border: unset;
      background: unset;
      padding: ${(props) =>
        `${props.theme.spacing[14]} ${props.theme.spacing[16]}`};
    }
  }
  & span {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.unit["12"]}px;
    margin-top: ${(props) => props.theme.spacing["8"]};
    & img {
      margin: 0 ${(props) => props.theme.spacing[8]};
    }
  }
`;
