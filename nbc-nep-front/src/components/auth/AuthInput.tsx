import { blind, info, unblind } from "@/assets/auth";
import Image from "next/image";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { StAuthInputSection } from "./styles/authForm.styles";

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

  const pwCheckValidation = () => {
    switch (id) {
      case "signUp_check_pw":
        return watch("signUp_pw");
      case "findPw_check_pw":
        return watch("findPw_pw");
      default:
        return null;
    }
  };

  const { ref, onChange, onBlur, name } = register(id, {
    required: true,
    validate: (value) => validate(value, pwCheckValidation()),
  });

  return (
    <StAuthInputSection $isError={!!error[id]?.message}>
      <div>
        <input
          id={id}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
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
