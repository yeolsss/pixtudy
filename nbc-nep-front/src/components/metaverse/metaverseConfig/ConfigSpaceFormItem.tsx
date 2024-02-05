import { PropsWithChildren } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  StErrorText,
  StHeader,
} from "@/components/metaverse/styles/config.styles";

interface FormFields {
  name: string;
  description: string;
}

interface Props {
  title: string;
  maxLength: number;
  curLength: number;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<FormFields>>;
}

export default function ConfigSpaceFormItem({
  title,
  curLength,
  maxLength,
  children,
  error,
}: PropsWithChildren<Props>) {
  return (
    <div>
      <StHeader>
        <span>{title}</span>
        <span>
          {curLength}/{maxLength}
        </span>
      </StHeader>
      {children}
      {error && <StErrorText>{error as string}</StErrorText>}
    </div>
  );
}

ConfigSpaceFormItem.defaultProps = {
  error: "",
};
