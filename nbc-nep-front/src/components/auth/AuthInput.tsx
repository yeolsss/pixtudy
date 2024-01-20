import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import styled from "styled-components";

interface Props {
  placeholder: string;
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
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
  return (
    <StAuthInput
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, {
        required: true,
        validate: (value) =>
          validate(value, id === "signUp_check_pw" ? watch("signUp_pw") : null),
      })}
    />
  );
}

const StAuthInput = styled.input`
  width: 100%;
  height: ${(props) => props.theme.unit["48"]}px;
  font-size: ${(props) => props.theme.unit["14"]}px;
  font-family: inherit;
`;
