import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  placeholder: string;
  labelTitle: string;
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  validate: (value: string) => boolean | string;
}

export default function AuthInput({
  placeholder,
  labelTitle,
  id,
  type,
  register,
  error,
  validate,
}: Props) {
  return (
    <section>
      <label htmlFor={id}>{labelTitle}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, {
          required: true,
          validate: validate,
        })}
      />
      {error && <span>{error?.message as string}</span>}
    </section>
  );
}
