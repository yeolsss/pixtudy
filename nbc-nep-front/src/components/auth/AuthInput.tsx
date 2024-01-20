import {
  FieldError,
  FieldErrors,
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
  return (
    <StAuthInputSection>
      <input
        id={id}
        type={type}
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
      {error[id]?.message && <span>{error[id]?.message as string}</span>}
    </StAuthInputSection>
  );
}

const StAuthInputSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & input {
    width: 100%;
    height: ${(props) => props.theme.unit["48"]}px;
    font-size: ${(props) => props.theme.unit["14"]}px;
    font-family: inherit;
  }
  & span {
    display: inline-block;
    margin-top: ${(props) => props.theme.spacing["8"]};
  }
`;
